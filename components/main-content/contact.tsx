'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser";
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    message: z.string().min(1, "Mensagem é obrigatória")
})

const Contact = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (values: z.infer<typeof formSchema>) => {
        const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

        setIsSubmitting(true);


        emailjs
            .send(
                serviceID as string,
                templateID as string,
                values,
                publicKey as string
            )
            .then(
                () => {
                    toast.success("Mensagem enviada com sucesso!");
                    form.reset();
                    setIsSubmitting(false);
                },
                () => {
                    toast.error("Erro ao enviar mensagem. Tente novamente mais tarde.");
                    setIsSubmitting(false);
                }
            );

    };

    return (<section className="text-left space-y-6">
        <h2 className="font-body font-bold text-xl">Contato</h2>
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(sendEmail)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="seuemail@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mensagem</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Deixe sua mensagem aqui!" className="resize-none h-32 max-w-88 md:max-w-full"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar Mensagem"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    </section>);
}

export default Contact;