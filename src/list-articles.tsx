import { useEffect, useState } from "react";
import { Article, list } from "./api/list";
import { Icon, List } from "@raycast/api";

function getProgressIcon(readingProgress: number) {
  const asPercentage = readingProgress * 100;
  if (asPercentage === 0) {
    return Icon.Circle;
  } else if (asPercentage === 100) {
    return Icon.CircleProgress100;
  } else if (asPercentage > 0 && asPercentage <= 50) {
    return Icon.CircleProgress25;
  } else if (asPercentage > 50 && asPercentage < 75) {
    return Icon.CircleProgress50;
  } else {
    return Icon.CircleProgress75;
  }
}
export default function ListArticleCommand() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    list().then((response) => {
      const sortedArticles = response.results.sort(
        (a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime()
      );
      setArticles(sortedArticles);
    });
  }, []);

  return (
    <List isShowingDetail>
      {articles.map((article) => (
        <List.Item
          key={article.id}
          title={article.title}
          subtitle={article.site_name}
          detail={
            <List.Item.Detail
              markdown={`
# ${article.title}

![](${article.image_url})
            
${article.summary}
            `}
            />
          }
          icon={getProgressIcon(article.reading_progress)}
        />
      ))}
    </List>
  );
}
