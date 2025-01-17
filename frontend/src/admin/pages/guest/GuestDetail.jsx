import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";

const GuestDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [guest, setGuest] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        IDnumber: "",
        dateOfBirth: "",
        guestCategories: "",
        guestType: "",
    });
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewGuest(id);
            console.log(data);
            // if (data?.code === 0) {
            setData(data);
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div className="h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 border-b border-gray-300">
                Guest Detail
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">ID Number: </p>
                    <p className="text-gray-500">{data.IDnumber}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Name: </p>
                    <p className="text-gray-500">{data.name}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Category: </p>
                    <p className="text-gray-500">{data.guestCategories}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Type: </p>
                    <p className="text-gray-500">{data.guestType}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Date Of Birth: </p>
                    <p className="text-gray-500">
                        {new Date(data.dateOfBirth).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Phone Number: </p>
                    <p className="text-gray-500">{data.phoneNumber}</p>
                </div>
                <div className="flex ">
                    <Link
                        to="/admin/guest"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GuestDetail;
