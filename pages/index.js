import { MainGrid } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        alt={githubUser}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "gab618";

  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: "profileArea" }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div style={{ gridArea: "welcomeArea" }}>
        <Box>Bem vindo</Box>
      </div>
      <div style={{ gridArea: "profileRelationsArea" }}>
        <Box>Heróis</Box>
      </div>
    </MainGrid>
  );
}
