import { useEffect, useState } from "react";
import { list } from "./api/list";
import { Action, ActionPanel, getPreferenceValues, Icon, List } from "@raycast/api";
import { type Article } from "./utils/article";
import { useFetch, usePromise } from "@raycast/utils";

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

type Preference = {
  defaultListLocation: Article["location"];
};

export default function ListArticleCommand() {
  const [articleLocation, setArticleLocation] = useState<Article["location"]>(
    getPreferenceValues<Preference>().defaultListLocation
  );

  const { isLoading, data, pagination } = usePromise(
    () => async (options) => {
      const { results, nextPageCursor } = await list(articleLocation, options.cursor);
      console.log(results);
      return {
        data: results,
        hasMore: !!nextPageCursor,
        cursor: nextPageCursor,
      };
    },
    [articleLocation]
  );

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Location if the article to fetch"
          defaultValue={articleLocation}
          onChange={(value) => setArticleLocation(value as Article["location"])}
        >
          <List.Dropdown.Item title="New" value="new" />
          <List.Dropdown.Item title="Shortlist" value="shortlist" />
          <List.Dropdown.Item title="Feed" value="feed" />
          <List.Dropdown.Item title="Later" value="later" />
          <List.Dropdown.Item title="Archive" value="archive" />
        </List.Dropdown>
      }
      pagination={pagination}
    >
      {data?.map((article) => (
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
