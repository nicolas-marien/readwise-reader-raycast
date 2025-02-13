import { Action, ActionPanel, getPreferenceValues, Icon, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useState } from "react";
import { list } from "./api/list";
import { type Document } from "./utils/document";

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
  defaultListLocation: Document["location"];
};

export default function ListDocumentsCommand() {
  const [documentLocation, setDocumentLocation] = useState<Document["location"]>(
    getPreferenceValues<Preference>().defaultListLocation,
  );

  const { isLoading, data, pagination } = usePromise<() => Promise<Document[]>>(
    // @ts-expect-error
    () => async (options) => {
      const { results, nextPageCursor } = await list(documentLocation, options.cursor);
      return {
        data: results.sort((a, b) => new Date(b.last_moved_at).getTime() - new Date(a.last_moved_at).getTime()),
        hasMore: !!nextPageCursor,
        cursor: nextPageCursor,
      };
    },
    [documentLocation],
  );

  return (
    <List
      isShowingDetail
      isLoading={isLoading}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Location if the article to fetch"
          defaultValue={documentLocation}
          onChange={(value) => setDocumentLocation(value as Document["location"])}
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
      {data?.map((article) => {
        const markdown = `
# ${article.title}

${article.summary}
            `;
        return (
          <List.Item
            key={article.id}
            title={article.title}
            subtitle={article.site_name}
            detail={
              <List.Item.Detail
                markdown={markdown}
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label title="Author" text={article.author} />
                    <List.Item.Detail.Metadata.Label title="Website" text={article.site_name} />
                    <List.Item.Detail.Metadata.TagList title="Tags">
                      {Object.values(article.tags).map(({ name }) => (
                        <List.Item.Detail.Metadata.TagList.Item text={name} key={name} />
                      ))}
                    </List.Item.Detail.Metadata.TagList>
                  </List.Item.Detail.Metadata>
                }
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
        );
      })}
    </List>
  );
}
