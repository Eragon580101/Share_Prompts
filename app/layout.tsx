import "@styles/global.css";
import { FC } from "react";
import { Nav, Provider } from "@components";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

const RootLayout: FC<RootLayoutProps> = ({ children }): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
