"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

type UserData = {
    id: string; 
    name: string;
    email: string;
    phone: string;
    address: string;
};

type userContextType = {
    addAllData: (data: {name: string; email: string; phone: string; address: string}) => void;
    getAllData: () => void;
    formData: UserData[];
    isLoading: boolean;
};

// const userContextDefaultValues : userContextType = {
//     getAllData: () => {},
//     addAllData: () => {},
// };

const UserContext = createContext<userContextType>({
    getAllData: () => {},
    addAllData: () => {},
    formData: [],
    isLoading: false,
});

type Props = {
    children: React.ReactNode;
}

const UserProvider = ({children}: Props) => {

    const [formData, setFormData] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // Add new user data to Firestore
    const addAllData = async(data: {name: string; email: string; phone: string; address: string}) => {
        setIsLoading(true);

        try {
            const docRef = await addDoc(collection(db, "userform"), data);
            console.log(docRef);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    // Fetch all user data from Firestore
    const getAllData = () => {
        try {
            const q = query(collection(db, "userform"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const userData: UserData[] = [];
                querySnapshot.forEach((doc) => {
                    userData.push({...doc.data(), id: doc.id} as UserData);
                });
                setFormData(userData);
            });

            // Cleanup the subscription on unmount
            return () => unsubscribe();

        } catch (error) {
            console.log(error);            
        }
    }

    return(
        <UserContext.Provider value={{getAllData, addAllData, formData, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export {UserProvider, useUser};