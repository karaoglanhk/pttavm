# Paketi İndirin:

```bash
npm install pttavm
```

## Özellikler:
- Ürün ekleme
- Ürün güncelleme (Fiyat ve stok dahil)
- Listelenmiş ürünlerinin tamamını varyantlar ile beraber çekme
- Listelenmiş ürünün bilgilerini alma
- Ana ve alt kategori bilgilerini alma

## Kullanım:

### Client oluşturma:
```js
import pttavm from 'pttavm';

const loginUsername = "***" // Login kullanıcı adınızı buraya girin
const loginPassword = "***" // Login şifrenizi buraya girin

const client = new pttavm(loginUsername, loginPassword)
```

### Kategorileri listeleme:
```js
const categoryList = await client.getCategoryList()
console.log(categoryList)
```

### Listelenmiş ürünleri getirme:
Bu servis listelenmiş olan ürünleri detayları ile beraber getirir.
```js
const listedProducts = await client.getListedProducts()
console.log(listedProducts)
```

### Ürün detaylarını getirme:
```js
const productDetails = await client.getProductDetails(productId)
console.log(productDetails)
```

### Ürün ekleme:
```js
const productData = {
    contents: {
        tr: {
            name: "Güllü Lokum", // Ürün İsmi
            subname: "", // Kısa Açıklama
            description: `<ul>
  <li>loremipsum.</li>
  <li>loremipsum.</li>
  <li>loremipsum.</li>
  <li>loremipsum.</li>
</ul>` // Ürün açıklaması - HTML formatında olmalıdır.
        }
    },
    vat_ratio: "1", // Vergi Oranı
    vat_excluded_price: "167.3267", // Vergi Hariç Fiyatı
    no_shipping: "", // Dijital ürün mü ? Evet : "1"
    cargo_from_supplier: "1", // Kargoyu satıcı mı karşılıyor ? Evet : "1"
    single_box: "1", // Ürün tek kutuda mı gönderilecek ?
    weight: 1000, // Ağırlık - Kargo için
    width: 14.41, // Genişlik - Kargo için
    height: 14.41, // Yükseklik - Kargo için
    depth: 14.41, // Uzunluk - Kargo için
    shipment_profile: "", // Kargo Profili | Default : ""
    estimated_courier_delivery: "2", // Kargoya teslim edilmesi süresi
    stock_code: "I101", // Satıcı stok kodu
    warranty_period: "", // Garanti süresi. Yoksa: ""
    warranty_company: "", // Garantiyi veren firma. Yoksa: ""
    quantity: "30", // Stok Miktarı
    barcode: "8611111111119", // Barkod
    ean_isbn_code: "",
    gtin_no: "",
    mpn: "",
    photos: [ // Ürün görselleri
        {
            order: 1, // Fotoğrafın gösterim sırasını belirtir
            url: "https://google.com/media/image.jpg"
        }
    ],
    category_properties: [ // Kategori Özellikleri
        {
            id: 6564, // Marka Property
            value: "123456+Marka İsmi" // Marka ID + Marka Adı (Sistemdeki gibi)
        }
    ],
    evo_category_id: "2423", // Ürün Kategori ID Bilgisi
    variants: [ // Varyantlar. Yok ise : ""
        {
            parameter_id: [19115668], // Varyant özellik id'si
            stock: 30, // Varyant stok miktarı
            price_diff: 150, // KDV dahil olarak, ana ürün fiyatına göre varyantın fiyat farkı
            barcode: "8611111111117" // Varyant barkodu
        },
        {
            parameter_id: [19115689],
            stock: 30,
            price_diff: 50,
            barcode: "8611111111118"
        },
        {
            parameter_id: [19373045],
            stock: 30,
            price_diff: 0,
            barcode: "8611111111119"
        }
    ],
    product_safety: {
        manufacturer_company_ids: ["685************54"], // Üretici firma bilgisine atanan id
        responsible_company_ids: [],
        files_id: []
    }
}

const addProductJob = await client.addProduct(productData)
console.log(addProductJob)
```


### Ürün güncelleme:
Fiyat ve stok güncelleme işlemi de bu yöntemle yapılmaktadır.
productData objesine getListedProducts metodu ile elde edilen ürün bilgileri içindeki 'productDetails' alanı kullanılarak erişilebilir. Veya getProductDetails metodu kullanılarak direkt erişilebilir.
```js
const productData = {
    contents: {
        tr: {
            name: 'Portakallı Lokum',
            subname: '',
            description: `<ul>
  <li>********.</li>
  <li>******.</li>
</ul>`
        }
    },
    vat_ratio: 1,
    vat_excluded_price: 167.3267,
    no_shipping: '',
    cargo_from_supplier: 1,
    single_box: 1,
    weight: 1000,
    width: 14.41,
    height: 14.41,
    depth: 14.41,
    shipment_profile: 0,
    estimated_courier_delivery: 2,
    stock_code: 'I104',
    warranty_period: 0,
    warranty_company: '',
    quantity: 90,
    barcode: '861111111111',
    ean_isbn_code: '',
    gtin_no: '',
    mpn: '',
    photos: [
        {
            order: 1,
            url: 'https://cdn-img.pttavm.com/pimages/************98d6.webp'
        }
    ],
    category_properties: [
        {
            id: 6564,
            value: '879216+Marka'
        }
    ],
    evo_category_id: '2423',
    variants: [
        {
            combination_id: 1111111,
            parameter_id: [1111111],
            stock: 30,
            price_diff: 150,
            barcode: '86222222222'
        },
        {
            combination_id: 2222222,
            parameter_id: [2222222],
            stock: 30,
            price_diff: 50,
            barcode: '862222222222'
        },
        {
            combination_id: 33333333,
            parameter_id: [33333333],
            stock: 30,
            price_diff: 0,
            barcode: '861111111111'
        }
    ],
    product_id: '123456789'
};
const updateProductJob = await client.updateProduct(productData)
console.log(updateProductJob)
```