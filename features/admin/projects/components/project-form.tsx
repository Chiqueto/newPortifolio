"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { projectSchema, ProjectFormValues } from "../schemas"
import { createProject, updateProject } from "../actions"
import { uploadFile } from "../../storage/actions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectFormProps {
  initialData?: any
  projectId?: string
}

export function ProjectForm({ initialData, projectId }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: initialData || {
      title: "",
      slug: "",
      short_description: "",
      description: "",
      status: "DEVELOPMENT",
      project_type: "",
      featured: false,
      published: true,
      repository_url: "",
      live_url: "",
      start_date: "",
      end_date: "",
      sort_order: 0,
    },
  })

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true)

    let coverUrl = initialData?.cover_image_url

    if (coverFile) {
      const ext = coverFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      // use a temporary id if creating new, or the actual id
      const folderId = projectId || 'temp'
      
      const { url, error } = await uploadFile("portfolio", `projects/${folderId}/cover/${fileName}`, coverFile)
      if (error) {
        toast.error("Erro no upload", { description: error })
        setIsLoading(false)
        return
      }
      coverUrl = url
    }

    const res = projectId 
      ? await updateProject(projectId, data, coverFile ? coverUrl : undefined)
      : await createProject(data, coverUrl)

    if (res.error) {
      toast.error("Erro ao salvar", { description: res.error })
    } else {
      toast.success("Projeto salvo com sucesso!")
      router.push("/admin/projects")
      router.refresh()
    }
    
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título do projeto" {...field} onChange={(e) => {
                    field.onChange(e)
                    if (!projectId && !form.formState.dirtyFields.slug) {
                      form.setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
                    }
                  }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="meu-projeto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PRODUCTION">Em Produção</SelectItem>
                    <SelectItem value="PRE_PRODUCTION">Pré-produção</SelectItem>
                    <SelectItem value="DEVELOPMENT">Em Desenvolvimento</SelectItem>
                    <SelectItem value="ACADEMIC">Acadêmico</SelectItem>
                    <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Projeto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Web App, Mobile App" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repository_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Repositório</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="live_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Live</FormLabel>
                <FormControl>
                  <Input placeholder="https://meuprojeto.com" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Início</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Fim</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Curta</FormLabel>
              <FormControl>
                <Textarea placeholder="Breve resumo..." {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Completa</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição detalhada..." className="h-32" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Publicado</FormLabel>
                  <FormDescription>
                    O projeto será visível no portfólio.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Destaque</FormLabel>
                  <FormDescription>
                    Destacar o projeto na página inicial.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Imagem de Capa</FormLabel>
          {initialData?.cover_image_url && !coverFile && (
            <div className="mb-2">
              <img src={initialData.cover_image_url} alt="Capa" className="h-32 object-cover rounded-md border" />
            </div>
          )}
          <Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Projeto"}
        </Button>
      </form>
    </Form>
  )
}
