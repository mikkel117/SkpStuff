// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.scss";

export default function Root() {
  return (
    <Html lang='en'>
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset='utf-8' />
        <Meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav>
              <h1 class='title'>
                <A href='/'>AnimeNexus</A>
              </h1>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
