import type { ImageConfig, ImageCategory } from './config';
import { socialImages } from './social';
import { bannerImages } from './banner';


class ImageRegistry {
  private static instance: ImageRegistry;
  private registry: Map<string, ImageConfig> = new Map();

  private constructor() {
    this.initializeRegistry();
  }

  public static getInstance(): ImageRegistry {
    if (!ImageRegistry.instance) {
      ImageRegistry.instance = new ImageRegistry();
    }
    return ImageRegistry.instance;
  }

  private initializeRegistry(): void {
    Object.values(socialImages).forEach(config => {
      this.register(`social:${config.provider}`, config);
    });

    Object.entries(bannerImages).forEach(([key, config]) => {
      this.register(`banner:${key}`, config);
    });
  }

  public register(key: string, config: ImageConfig): void {
    this.registry.set(key, config);
  }

  public get(key: string): ImageConfig | undefined {
    return this.registry.get(key);
  }

  public getByCategory(category: ImageCategory): ImageConfig[] {
    return Array.from(this.registry.values()).filter(
      config => config.category === category
    );
  }

  public getAllKeys(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const imageRegistry = ImageRegistry.getInstance();
export default imageRegistry; 