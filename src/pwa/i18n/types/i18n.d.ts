import "next-i18next";

declare module "next-i18next" {
  // Override default namespace typing dengan namespace yang kamu definisikan
  interface DefaultNamespace {
    common: "common";
    home: "home";
  }

  interface Resources {
    common: {
      hello: string;
      welcome: string;
    };
    home: {
      title: string;
      subtitle: string;
    };
  }
}
