import "@/styles/globals.scss";
import Contentlayout from "@/shared/layout-components/layout/content-layout";
import Landingpagelayout from "@/shared/layout-components/layout/landingpage-layout";
import Switcherlayout from "@/shared/layout-components/layout/switcher-layout";
import Authenticationlayout from "@/shared/layout-components/layout/authentication-layout";
import SSRProvider from "react-bootstrap/SSRProvider";


const layouts = {
  Contentlayout: Contentlayout,
  Landingpagelayout: Landingpagelayout,
  Switcherlayout: Switcherlayout,
  Authenticationlayout: Authenticationlayout,
};
function MyApp({ Component, pageProps }) {
  const Layout =
    layouts[Component.layout] ||
    ((pageProps) => <Component>{pageProps}</Component>);
  return (
    <Layout>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
    </Layout>
  );
}
export default MyApp;
