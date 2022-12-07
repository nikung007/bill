import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function Index({ token }) {
    // console.log(token);
    const router = useRouter()
    useEffect(() => {
        sessionStorage.setItem("token", token);
        router.push('/');
    }, [])

    return (
        <div>Index</div>
    )
}

export default Index

export async function getServerSideProps() {

    var data = {
        username: "admin",
        password: "admin",
        grant_type: "password"
    };

    var formBody = [];

    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const res = await fetch(`https://dobob777-001-site1.atempurl.com/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        })
    const resdata = await res.json()


    // console.log("==>>", resdata);

    return {
        props: {
            "token": resdata.access_token
        }
    }
}