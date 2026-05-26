"use client"
import {useState} from 'react';
import {register} from './action';

export default function NewOshiPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  return (
    <main>
      <h1>推しを登録</h1>
      <form action={register}>
        <label>名前</label>
        <input type="text" name="oshiName" value={name} placeholder="名前を入力" onChange={(e) => setName(e.target.value)}/>
        <label>写真</label>
        <input type="url" name="oshiImage" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
        <label>説明</label>
        <input type="text" name="oshiDescription" value={description} placeholder="説明を入力" onChange={(e) => setDescription(e.target.value)}/>
        <button type="submit" className="py-3 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700 font-medium text-sm transition-colors">
          作成
        </button>
      </form>
    </main>
  );
}
