import { defineStore } from "pinia";
import img1 from "@/assets/images/1.webp";
import img2 from "@/assets/images/2.webp";
import img3 from "@/assets/images/3.webp";
import img4 from "@/assets/images/4.png";
import img5 from "@/assets/images/5.webp";
import img6 from "@/assets/images/6.webp";



export const useAnimal = defineStore('animals', {
    state: () => ({
        animals: [
            { url: img1},
            { url: img2 },
            { url: img3 },
            { url: img4 },
            { url: img5 },
            { url: img6 },

        ]
    }),
});
