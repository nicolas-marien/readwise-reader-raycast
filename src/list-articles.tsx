import { useEffect, useState } from "react";
import { list } from "./api/list";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { type Article } from "./utils/article";

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

const ArticleLocationDropdown: React.FunctionComponent<{
  onLocationChange: (location: Article["location"]) => unknown;
}> = (props) => {
  return (
    <List.Dropdown
      tooltip="Location if the article to fetch"
      onChange={(value) => props.onLocationChange(value as Article["location"])}
    >
      <List.Dropdown.Item title="New" value="new" />
      <List.Dropdown.Item title="Shortlist" value="shortlist" />
      <List.Dropdown.Item title="Feed" value="feed" />
      <List.Dropdown.Item title="Later" value="later" />
      <List.Dropdown.Item title="Archive" value="archive" />
    </List.Dropdown>
  );
};
export default function ListArticleCommand() {
  const [articleLocation, setArticleLocation] = useState<Article["location"]>("new");
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    list(articleLocation).then((response) => {
      console.log(response.results);
      const sortedArticles = response.results.sort(
        (a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime()
      );
      setArticles(sortedArticles);
    });
  }, [articleLocation]);

  return (
    <List isShowingDetail searchBarAccessory={<ArticleLocationDropdown onLocationChange={setArticleLocation} />}>
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
          actions={
            <ActionPanel title={article.title}>
              <Action.OpenInBrowser url={article.url} title="Open article in Readwise" />
              <Action.OpenInBrowser url={article.source_url} title="Open article in source website" />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
