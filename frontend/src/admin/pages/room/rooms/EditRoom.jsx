import React, { useEffect, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import {
    viewListRoomType,
    viewRoomtype,
} from "../../../../service/roomTypeService";
import { editRoom, viewRoom } from "../../../../service/roomService";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditRoom = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [roomType, setRoomType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [room, setRoom] = useState({
        roomNumber: "",
        roomType: "",
    });
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewRoom(id);
            const roomTypeData = await viewListRoomType(-1);
            setData(data);
            console.log("data: ", data);
            setRoomType(roomTypeData.data);
            setIsLoading(false);
            setRoom({
                roomNumber: data.roomNumber,
                roomType: data.roomType,
            });
            console.log("room: ", room);
        } catch (error) {
            console.error(error);
        }
    };

    const editData = async () => {
        console.log(room);
        try {
            setIsLoading(true);
            const data = await editRoom(id, room);
            console.log(data);
            if (data.code === 0) {
                toast.success(data.message);
                nav("/admin/rooms");
            } else {
                toast.error(data.message);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({
            ...room,
            [name]: value,
        });
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Edit Room {data.roomNumber}
            </div>
            <div>
                <div className="py-3 border-b">
                    <p className="font-semibold mr-4">Room Number: </p>
                    <input
                        name="roomNumber"
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                        defaultValue={data.roomNumber}
                        onChange={handleChange}
                    />
                </div>
                <select
                    name="roomType"
                    defaultValue={data.roomType}
                    onChange={handleChange}
                    id=""
                    className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                >
                    {roomType
                        ? roomType.map((roomtype) => (
                              <option key={roomtype._id} value={roomtype._id}>
                                  {roomtype.name}
                              </option>
                          ))
                        : ""}
                </select>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            editData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                    <Link
                        to="/admin/rooms"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditRoom;
