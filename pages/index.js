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
      <ul>
        {items.slice(0, 6).map((item) => (
          <li key={`key__${item.login}`}>
            <a href={item.html_url}>
              <img src={item.avatar_url} alt={item.login} />
              <span>{item.login}</span>
            </a>
          </li>
        ))}
      </ul>
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
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `8b89fdae5a8692eee76d0a45d3f35c`,
      },
      body: JSON.stringify({
        query: `
        query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }
        `,
      }),
    }).then(async (response) => {
      const { data } = await response.json();
      setComunidades(data.allCommunities);
    });

    fetch("https://api.github.com/users/gab618/followers").then(
      async (response) => {
        const data = await response.json();
        setGithubFollowers(data.sort(() => 0.5 - Math.random()));
      }
    );
  }, []);

  function handleCreateCommunity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comunidade = {
      title: formData.get("title"),
      imageUrl: formData.get("image"),
      creatorSlug: githubUser,
    };

    fetch("api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comunidade),
    }).then(async (response) => {
      const data = await response.json();
      const comunidade = data.record;
      setComunidades([...comunidades, comunidade]);
    });
  }

  const githubUser = "gab618";
  const favoriteUsers = [
    {
      login: "juunegreiros",
      avatar_url: "https://github.com/juunegreiros.png",
      html_url: "https://github.com/juunegreiros",
    },
    {
      login: "peas",
      avatar_url: "https://github.com/peas.png",
      html_url: "https://github.com/peas",
    },
    {
      login: "omariosouto",
      avatar_url: "https://github.com/omariosouto.png",
      html_url: "https://github.com/omariosouto",
    },
    {
      login: "danielhe4rt",
      avatar_url: "https://github.com/danielhe4rt.png",
      html_url: "https://github.com/danielhe4rt",
    },
    {
      login: "marcobrunodev",
      avatar_url: "https://github.com/marcobrunodev.png",
      html_url: "https://github.com/marcobrunodev",
    },
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

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.slice(0, 6).map((item) => (
                <li key={`key__${item.id}`}>
                  <a href={`/communities/${item.id}`}>
                    <img src={item.imageUrl} alt={item.title} />
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox items={favoriteUsers} title="Heróis" />
        </div>
      </MainGrid>
    </>
  );
}
