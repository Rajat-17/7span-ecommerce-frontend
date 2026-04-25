import Page from "../../components/Page";
import Container from "../../components/Container";
import Box from "../../components/Box";
import LoginForm from "../../section/login/LoginForm";

export default function LoginPage() {
  return (
    <Page title="Login">
      <Container>
        <Box className="min-h-screen flex items-center justify-center">
          <LoginForm />
        </Box>
      </Container>
    </Page>
  );
}