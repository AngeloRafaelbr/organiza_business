import style from "@/styles/index.module.css";
import HomeNavBar from "@/components/HomeNavBar/HomeNavbar";
import Link from 'next/link';
import Footer from "@/components/Footer/Footer";

export default function Home({ siteData }) {
  return (
    <div className="cont">
      <HomeNavBar />
      <div className="main">
        <div className={style.home}>
          <main className={style.homeMain}>
            <section className={style.homeTextSection}>
              <h1>{siteData.title}</h1>
              <ul>
                {siteData.features.map((feature, index) => (
                  <li key={index}><span>•</span> {feature}</li>
                ))}
              </ul>
              <h2 className={style.start}><Link href="/auth/register">Comece agora e transforme sua relação com o dinheiro!</Link></h2>
            </section>

            <section className={style.homeImageSection}>
              <img src={siteData.image} alt="homeImage" />
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  // Dados estáticos que você pode pegar de uma API, arquivo ou diretamente aqui
  const siteData = {
    title: "Organiza",
    features: [
      "Simplifique seu planejamento financeiro com uma plataforma que ajuda você a gerenciar receitas, despesas e investimentos.",
      "Defina metas, acompanhe seu progresso e tenha controle sobre suas finanças em um só lugar.",
      "Prepare-se para alcançar uma vida financeira mais equilibrada e organizada."
    ],
    image: "https://res.cloudinary.com/dcbd1dnvk/image/upload/v1730422334/homeImage_vfzlgm.png"
  };

  // Retorna os dados para a página no momento do build
  return {
    props: {
      siteData, // Aqui você passa os dados para a página como props
    },
  };
}
