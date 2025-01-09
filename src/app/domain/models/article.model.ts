export interface Article {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: number; // Usamos status para representar el estado del artículo
}

export const ArticleStatus = {
  ENABLED: 1,
  DISABLED: 2,
  DELETED: 99,
};

export class ArticleUtils {
  static getStatusLabel(status: number): string {
    switch (status) {
      case ArticleStatus.ENABLED:
        return 'Habilitado';
      case ArticleStatus.DISABLED:
        return 'Deshabilitado';
      case ArticleStatus.DELETED:
        return 'Eliminado';
      default:
        return 'Desconocido';
    }
  }

  static getStatusClass(status: number): string {
    switch (status) {
      case ArticleStatus.ENABLED:
        return 'bg-primary';
      case ArticleStatus.DISABLED:
        return 'bg-secondary';
      case ArticleStatus.DELETED:
        return 'bg-danger';
      default:
        return '';
    }
  }

  static canEdit(status: number): boolean {
    return status === ArticleStatus.ENABLED;
  }

  static canEnable(status: number): boolean {
    return status === ArticleStatus.DISABLED;
  }

  static canDisable(status: number): boolean {
    return status === ArticleStatus.ENABLED;
  }

  static canDelete(status: number): boolean {
    return status !== ArticleStatus.DELETED;
  }
}
