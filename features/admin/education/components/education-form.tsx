"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { educationSchema, EducationFormValues } from "../schemas"
import { createEducation, updateEducation } from "../actions"

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
import { Checkbox } from "@/components/ui/checkbox"

export function EducationForm({ initialData, educationId }: { initialData?: any; educationId?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema) as any,
    defaultValues: initialData || {
      institution: "",
      course: "",
      degree: "",
      start_date: "",
      end_date: "",
      current: false,
      sort_order: 0,
    },
  })

  async function onSubmit(data: EducationFormValues) {
    setIsLoading(true)

    const res = educationId 
      ? await updateEducation(educationId, data)
      : await createEducation(data)

    if (res.error) {
      toast.error("Erro ao salvar", { description: res.error })
    } else {
      toast.success("Formação salva com sucesso!")
      router.push("/admin/education")
      router.refresh()
    }
    
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField control={form.control} name="institution" render={({ field }) => (
            <FormItem><FormLabel>Instituição</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="course" render={({ field }) => (
            <FormItem><FormLabel>Curso</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="degree" render={({ field }) => (
            <FormItem><FormLabel>Grau (Ex: Bacharelado)</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="start_date" render={({ field }) => (
            <FormItem><FormLabel>Data Início</FormLabel><FormControl><Input type="date" {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="end_date" render={({ field }) => (
            <FormItem><FormLabel>Data Fim</FormLabel><FormControl><Input type="date" {...field} value={field.value || ""} disabled={form.watch("current")} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <FormField control={form.control} name="current" render={({ field }) => (
          <FormItem className="flex items-center gap-2 space-y-0">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <FormLabel>Cursando Atualmente</FormLabel>
          </FormItem>
        )} />

        <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Formação"}</Button>
      </form>
    </Form>
  )
}
