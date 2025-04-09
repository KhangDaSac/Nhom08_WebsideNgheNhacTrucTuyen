import React from 'react';
import Song from './Song';

const Songs = ({ songs }) => {
    return (
        <div>
            <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <tr>
                        <th className="p-3 border-b dark:border-gray-600">Ảnh</th>
                        <th className="p-3 border-b dark:border-gray-600">Tên bài hát</th>
                        <th className="p-3 border-b dark:border-gray-600">Nghệ sĩ</th>
                        <th className="p-3 border-b dark:border-gray-600">Thể loại</th>
                        <th className="p-3 border-b dark:border-gray-600">Phát hành</th>
                        <th className="p-3 border-b dark:border-gray-600">Lượt xem</th>
                        <th className="p-3 border-b dark:border-gray-600">Lượt thích</th>
                        <th className="p-3 border-b dark:border-gray-600">Nghe thử</th>
                        <th className="p-3 border-b dark:border-gray-600">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {songs.map((song) => (
                        <Song key={song._id} song={song} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Songs;
