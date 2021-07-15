import { useEffect, useState } from "react";

import { MainGrid } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        alt={githubUser}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      {/* <ul>
        {items.slice(0, 6).map((item) => (
          <li key={`key__${item}`}>
            <a href={`/users/${item}`}>
              <img src={`https://github.com/${item}.png`} alt={item} />
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([
    {
      id: "123",
      title: "Eu como biscoito",
      image:
        "https://cdn.pixabay.com/photo/2020/11/28/11/25/cookie-5784367_960_720.png",
    },
  ]);
  const [githubFollowers, setGithubFollowers] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/gab618/followers").then(
      async (response) => {
        const data = await response.json();
        setGithubFollowers(data);
      }
    );
  }, []);

  function handleCreateCommunity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get("title"),
      image: formData.get("image"),
    };

    setComunidades([...comunidades, comunidade]);
  }

  const githubUser = "gab618";
  const favoriteUsers = [
    "juunegreiros",
    "peas",
    "omariosouto",
    "danielhe4rt",
    "marcobrunodev",
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  type="text"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBox items={githubFollowers} title="Seguidores" />
          <ProfileRelationsBox items={favoriteUsers} title="Heróis" />
          <ProfileRelationsBox items={comunidades} title="Comunidades" />
        </div>
      </MainGrid>
    </>
  );
}
