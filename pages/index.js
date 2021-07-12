import { MainGrid } from "../src/components/MainGrid";
import { Box } from "../src/components/Box";

export default function Home() {
  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: "profileArea" }}>
        <Box>
          <img
            src="https://pbs.twimg.com/profile_images/1399458086503464967/bOD-QW2K_400x400.png"
            alt="avatar"
            style={{ borderRadius: "8px" }}
          />
        </Box>
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
