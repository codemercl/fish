export interface ProductTypes {
    quantity?: any;
    uid?: number | string;
    id: number;
    title: string;
    article: string;
    description: string;
    brand: string;
    marker: string;
    images_links: string[];
    in_archive?: boolean;
    parameters: {
        id: number;
        width: number;
        height: number;
        weight: number;
        length: number;
        size: string;
        color: string;
        material: string;
        action: string;
        diameter: number;
        type: string;
        made_by: string;
        amount: string;
        volume: number;
        aroma: string;
        number: string;
        fastening_type: string;
        form: string;
        peculiarities: string;
    };
    category: {
        id: number;
        name: string;
        image_link: string;
        parent: string;
        created_date: string;
        modified_date: string;
        created_by: string;
        modified_by: string;
    };
    sub_category: {
        id: number;
        name: string;
        image_link: string;
        parent: string;
        created_date: string;
        modified_date: string;
        created_by: string;
        modified_by: string;
    };
    in_stock: boolean;
    price_usd: number;
    price_uah: number;
    discount: number;
    markup: number;
    price_old: number;
    created_date: string;
    modified_date: string;
    created_by: string;
    modified_by: string;
}