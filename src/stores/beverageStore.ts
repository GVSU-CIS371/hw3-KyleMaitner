import { defineStore } from 'pinia';
import tempretures from '../data/tempretures.json';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../firebase';
import { BeverageType } from '../types/beverage';


//^correct


export const useBeverageStore = defineStore('BeverageStore', {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as any[],
    currentBase: null as any,
    syrups: [] as any[],
    currentSyrup: null as any,
    creamers: [] as any[],
    currentCreamer: null as any,
    currentName: "",
    beverage: [] as  BeverageType[],
    currentBeverage: null as BeverageType | null,

  }),


  actions: {
    async init() {
      try {
        // Load bases
        const baseSnap = await getDocs(collection(db, "bases"));
        this.bases = baseSnap.docs.map(doc => doc.data());
        this.currentBase = this.bases[0];

        // Load syrups
        const syrupSnap = await getDocs(collection(db, "syrups"));
        this.syrups = syrupSnap.docs.map(doc => doc.data());
        this.currentSyrup = this.syrups[0];

        // Load creamers
        const creamerSnap = await getDocs(collection(db, "creamers"));
        this.creamers = creamerSnap.docs.map(doc => doc.data());
        this.currentCreamer = this.creamers[0];

        // Load saved beverages
        const bevSnap = await getDocs(collection(db, "beverages"));
        this.beverage = bevSnap.docs.map(doc => doc.data() as BeverageType);
      } catch (error) {
        console.error("Error loading Firestore data:", error);
      }
    },

    async makeBeverage() {
      this.currentBeverage = {
        name: this.currentName,
        id: '${this.currentBase.id}- ${this.currentTemp.id}-${this.currentSyrup.id}-${this.currentCreamer.id}',
        temp: this.currentTemp,
        base: this.currentBase,
        syrup: this.currentSyrup,
        creamer: this.currentCreamer,
      };
      this.beverage.push(this.currentBeverage);
      
      await addDoc(collection(db, 'beverages'), this.currentBeverage);
    },
    

    //v does not work
    showBeverage(bev: BeverageType) {
      this.currentBeverage = bev;
      this.currentBase = bev.base;
      this.currentTemp = bev.temp;
      this.currentSyrup = bev.syrup;
      this.currentCreamer = bev.creamer;
      this.currentName = bev.name || "";  // Set the name as well if you want it to be visible
    },
    

  },
  persist: true,
});
