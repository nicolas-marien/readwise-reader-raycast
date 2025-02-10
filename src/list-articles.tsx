import { useEffect, useState } from "react";
import { list } from "./api/list";
import { List } from "@raycast/api";

export default function ListArticleCommand() {
  const [articles, setArticles] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    list().then((response) => {
      setArticles(response.results);
    });
  }, []);

  return (
    <List>
      {articles.map((article) => (
        <List.Item key={article.id} title={article.title} subtitle={article.site_name} />
      ))}
    </List>
  );
}
