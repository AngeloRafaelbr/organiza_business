// auth/register.jsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import formStyle from "@/styles/form.module.css";
import HomeNavBar from "@/components/HomeNavBar/HomeNavbar";
import Footer from "@/components/Footer/Footer";
import DynamicForm from "@/components/DynamicForm/DynamicForm";

// Função para SSR
export async function getServerSideProps(context) {
    const token = context.req.cookies.token;

    // Se o usuário já estiver autenticado, redireciona para o dashboard
    if (token) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return {
        props: {}, // Não passa nada para a página
    };
}

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });

            if (res.ok) {
                router.push("/auth/login");
            } else {
                const data = await res.json();
                setError(data.message || "Falha ao registrar");
            }
        } catch (error) {
            setError("Um erro ocorreu. Por favor tente de novo.");
        }
    };

    const registerFields = [
        {
            label: "Nome",
            type: "text",
            value: name,
            onChange: setName,
            placeholder: "Digite seu nome",
            required: true,
        },
        {
            label: "Email",
            type: "email",
            value: email,
            onChange: setEmail,
            placeholder: "Digite seu email",
            required: true,
        },
        {
            label: "Senha",
            type: "password",
            value: password,
            onChange: setPassword,
            placeholder: "Digite sua senha",
            required: true,
        },

    ];

    return (
        <div className="cont">
            <header><HomeNavBar /></header>
            <div className="main">
                <div className={formStyle.register}>
                    <div className={formStyle.authDiv}>
                        <section className={formStyle.formSection}>

                            <DynamicForm
                                title="Registre-se"
                                fields={registerFields}
                                buttonLabel="Registrar"
                                onSubmit={handleSubmit}
                            />

                            {error && <p className={formStyle.error}>{error}</p>}

                            <span className={formStyle.formLink}>
                                Já possui uma conta?
                                <strong>
                                    <Link href="./login"> Entrar</Link>
                                </strong>
                            </span>
                        </section>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}