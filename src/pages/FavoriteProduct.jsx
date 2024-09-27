import { useState, useEffect, Fragment } from "react";
import { useApiGet, useApiDelete } from "../services/apiService";
import CardProduct from "../components/CardProduct";
import ImageNotFound from "../assets/not-found.svg";

const FavoriteProduct = () => {
     const [favoriteProducts, setFavoriteProducts] = useState(null);

     const fetchFavoriteProducts = async () => {
          try {
               const userId = localStorage.getItem('userId');
               const response = await useApiGet(`/likeAdvert/getLikeAdvert/${userId}`);
               const { likedAdverts } = response.data.user;

               setFavoriteProducts(likedAdverts);

          } catch (error) {
               console.error('Error fetching favorite products:', error);
          }
     }

     useEffect(() => {

          fetchFavoriteProducts();
     }, []);

     // Delete Favorit Advert
     const deleteFavoriteProduct = async (advertId) => {
          try {
               await useApiDelete(`/likeAdvert/deleteLikeAdvert/${advertId}`)

               fetchFavoriteProducts()
          } catch (error) {
               console.error('Error removing favorite product:', error);
          }
     }

     return (
          <div className="max-w-6xl mx-auto">
               <h2 className="font-bold text-primary text-xl md:text-2xl mb-4">
                    Daftar Favorit Saya
               </h2>
               {favoriteProducts && favoriteProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {favoriteProducts?.map((item) => (
                              <Fragment key={item?.id} >
                                   <CardProduct
                                        id={item?.advert?.id}
                                        image={item?.advert?.image[0]}
                                        title={item?.advert?.title}
                                        price={item?.advert?.price}
                                        location={item?.advert?.province.name}
                                        isLiked={favoriteProducts}
                                   />
                                   <button hidden onClick={() => deleteFavoriteProduct(item?.id)}>Hapus</button>
                              </Fragment>
                         ))}
                    </div>
               ) : (
                    <div className="flex flex-col justify-center items-center">
                         <img src={ImageNotFound} alt="Favorit Product Not Found" className="w-60" />
                         <h3 className="text-primary text-2xl font-bold my-2 text-center">
                              Favorit produk Kosong
                         </h3>
                    </div>
               )
               }
          </div >
     );
};

export default FavoriteProduct;
