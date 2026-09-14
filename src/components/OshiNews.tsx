type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
};

function parseRssItems(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  for (const block of itemBlocks) {
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim() ?? "";
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? "";
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() ?? "";
    if (title && link) items.push({ title, link, pubDate });
  }

  return items.slice(0, 5);
}

export async function OshiNews({ name }: { name: string }) {
  let items: NewsItem[] = [];

  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(name)}&hl=ja&gl=JP&ceid=JP:ja`;
    const res = await fetch(url);
    const xml = await res.text();
    items = parseRssItems(xml);
  } catch {
    return <p className="text-sm text-zinc-400">ニュースを取得できませんでした</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-zinc-400">関連ニュースはありません</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.link}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-zinc-200 p-3 text-sm hover:border-teal-300 hover:bg-teal-50"
          >
            <p className="font-medium text-zinc-700">{item.title}</p>
            {item.pubDate && (
              <p className="mt-1 text-xs text-zinc-400">
                {new Date(item.pubDate).toLocaleDateString("ja-JP")}
              </p>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
