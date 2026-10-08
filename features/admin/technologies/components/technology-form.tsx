"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { technologySchema, TechnologyFormValues } from "../schemas"
import { createTechnology, updateTechnology } from "../actions"
import { uploadFile } from "../../storage/actions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function TechnologyForm({ initialData, technologyId }: { initialData?: any; technologyId?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [iconFile, setIconFile] = useState<File | null>(null)

  const form = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologySchema) as any,
    defaultValues: initialData || {
      name: "",
      slug: "",
      category: "",
      sort_order: 0,
    },
  })

  async function onSubmit(data: TechnologyFormValues) {
    setIsLoading(true)

    let iconUrl = initialData?.icon_url
    if (iconFile) {
      const ext = iconFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { url, error } = await uploadFile("portfolio", `technologies/icons/${fileName}`, iconFile)
      if (error) {
        toast.error("Erro no upload", { description: error })
        setIsLoading(false)
        return
      }
      iconUrl = url
    }

    const res = technologyId 
      ? await updateTechnology(technologyId, data, iconFile ? iconUrl : undefined)
      : await createTechnology(data, iconUrl)

    if (res.error) {
      toast.error("Erro ao salvar", { description: res.error })
    } else {
      toast.success("Tecnologia salva com sucesso!")
      router.push("/admin/technologies")
      router.refresh()
    }
    
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} onChange={(e) => {
                  field.onChange(e)
                  if (!technologyId && !form.formState.dirtyFields.slug) {
                    form.setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
                  }
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="slug" render={({ field }) => (
            <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem><FormLabel>Categoria</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="space-y-2">
          <FormLabel>Ícone</FormLabel>
          {initialData?.icon_url && !iconFile && (
            <div className="mb-2"><img src={initialData.icon_url} alt="Ícone" className="h-12 object-contain bg-muted p-2 rounded" /></div>
          )}
          <Input type="file" accept="image/*" onChange={(e) => setIconFile(e.target.files?.[0] || null)} />
        </div>

        <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Tecnologia"}</Button>
      </form>
    </Form>
  )
}
