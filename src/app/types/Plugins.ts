export interface Plugin {
  id: string;
  name: string;
  install: (editor: any, options?: any) => void;
}
