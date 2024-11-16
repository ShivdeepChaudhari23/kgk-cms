import { Plugin } from "app/types/Plugins";

class PluginManager {
  private plugins: Record<string, Plugin> = {};

  register(plugin: Plugin) {
    if (!this.plugins[plugin.id]) {
      this.plugins[plugin.id] = plugin;
    }
  }

  getPlugins() {
    return Object.values(this.plugins);
  }

  applyPlugins(editor: any) {
    Object.values(this.plugins).forEach((plugin) => plugin.install(editor));
  }
}

export const pluginManager = new PluginManager();
