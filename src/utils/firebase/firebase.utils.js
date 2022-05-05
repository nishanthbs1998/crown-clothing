import {initializeApp} from 'firebase/app'
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
createUserWithEmailAndPassword } from 'firebase/auth';

import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAajWGZ7iU6IeKBYeOGQYtjysmzXmqzP-Q",
  authDomain: "crown-clothing-db-6d9aa.firebaseapp.com",
  projectId: "crown-clothing-db-6d9aa",
  storageBucket: "crown-clothing-db-6d9aa.appspot.com",
  messagingSenderId: "844711591835",
  appId: "1:844711591835:web:4710001a41dbd78e696b3e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);

export const db=getFirestore();

export const createUserDocumentFromAuth= async(userAuth,additionalInformation={})=>{
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot=await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

        if(!userSnapshot.exists())
        {
            const {displayName,email}=userAuth;
            const createdAt=new Date();

            try{
                await setDoc(userDocRef,{
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                });
            }catch(error){
                console.log('Error creating the user',error.message);
            }
        }

    return userDocRef;

}
    
export const createAuthUserWithEmailAndPassword=async(email,password)=>{

    if(!email||!password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
};

     

