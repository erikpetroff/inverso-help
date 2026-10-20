import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { FolderIcon } from "@sanity/icons/Folder";
import { TranslateIcon } from "@sanity/icons/Translate";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Help center")
    .items([
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Articles by collection")
        .icon(FolderIcon)
        .child(
          S.documentTypeList("helpCollection")
            .title("Collections")
            .defaultOrdering([{ field: "order", direction: "asc" }])
            .child((collectionId) =>
              S.documentList()
                .title("Articles")
                .schemaType("article")
                .filter('_type == "article" && collection._ref == $collectionId')
                .params({ collectionId })
                .defaultOrdering([{ field: "order", direction: "asc" }])
                .initialValueTemplates([
                  S.initialValueTemplateItem("article-in-collection", { collectionId }),
                ]),
            ),
        ),
      S.listItem()
        .title("Missing English translation")
        .icon(TranslateIcon)
        .child(
          S.documentList()
            .title("Not translated to English")
            .filter('_type in ["article", "helpCollection"] && !defined(en.title)'),
        ),
      S.divider(),
      S.documentTypeListItem("helpCollection").title("Collections"),
      S.documentTypeListItem("article").title("All articles").icon(DocumentTextIcon),
      S.documentTypeListItem("author").title("Authors"),
    ]);
