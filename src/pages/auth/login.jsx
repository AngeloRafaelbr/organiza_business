// auth/login.jsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import formStyle from "@/styles/form.module.css";
import HomeNavBar from "@/components/HomeNavBar/HomeNavbar";
import Footer from "@/components/Footer/Footer";
import DynamicForm from "@/components/DynamicForm/DynamicForm";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        document.cookie = "token=" + data.token + "; path=/; expires=" + new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString();
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Falha no login");
      }
    } catch {
      setError("Ocorreu um erro. Tente novamente.");
    }
  };

  const fieldsLogin = [
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
      <HomeNavBar />
      <div className="main">
        <div className={formStyle.login}>
          <div className={formStyle.authDiv}>
            <section className={formStyle.formSection}>
              <DynamicForm
                title="Login"
                fields={fieldsLogin}
                buttonLabel="Entrar"
                onSubmit={handleSubmit}
              />
              {error && <p className={formStyle.error}>{error}</p>}
              <span className={formStyle.formLink}>
                Ainda não possui uma conta?
                <strong>
                  <Link href="./register"> Inscreva-se</Link>
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
