export interface CommonTranslation {
  hello: string;
  welcome: string;
}
export interface I18nNamespaces {
  common: CommonTranslation;
  home: {
    title: string;
    subtitle: string;
  };
}
