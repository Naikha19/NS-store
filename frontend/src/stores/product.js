import { defineStore } from "pinia";

export const useProductStore = defineStore("product",{
    state: () => ({
        products : [],
        loading : false,
        error : null,
    }),

    actions: {
        async fetchProducts(){
            try{
                this.loading = true
                this.error  = null
                const response = await fetch("http://localhost:5000/api/products",{
                    method: 'GET',
                    credentials: "include"
                })

                if(!response.ok){
                    throw new Error(data.message || "Failed to fetch products")
                }

                const data = await response.json()
                this.products = data
               

            }catch(error){
                this.error = error.message;
                console.error("Error fetching products:", error)
            }finally{
                this.loading = false
            }
        }
    }
})