$(window).load(() => {
    ((root, factory) => {
        if (typeof define === "function" && define.amd) {
            console.log("define");
        } else if (typeof module !== "undefined" && module.exports) {
            module.exports = factory();
        } else {
            root.lbutils = factory();
        }
    })(this, () => {
        let lbutils = {
            // variables
            pageNo: 1,
            articleId: $("#article-id").val(),
            totalPage: $("#total-pages").val(),
            highLightContainer: $("#highlight-container"),
            storyContainer: $("#story-container"),
            moreUpdatesButton: $("#more-updates"),
            liveBlogStatus: parseInt($("#liveblog-status").val()),
            articleDescription: $("#article-description"),
            IMAGE_BASE_PATH: $("#image-base-path").val(),
            cardShare: $("body"),
            document: $(document),
            // end variables

            // event binding
            bindEvents: function () {
                lbutils.moreUpdatesButton.on(
                    "click",
                    lbutils.liveBlogLoadMore.bind(this)
                );
                lbutils.cardShare.delegate(
                    ".lb-article-share-icon",
                    "click",
                    lbutils.showShareIcons.bind(this)
                );
                lbutils.document.on("click", lbutils.hideShareIcons.bind(this));
            },
            // end event binding

            // common functions
            showShareIcons: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.id != undefined) {
                    let id = e.target.id.split("-")[4];
                    $(`#lb-default-share-${id}`).show();
                    console.log(e.target.id);
                }
            },
            hideShareIcons: () => {
                $("[id^=lb-default-share-]").hide();
            },
            reloadEmbeddedPostElements: () => {
                if (typeof FB !== "undefined") {
                    FB?.XFBML?.parse(); // to parse fb elements for loading
                }
                if (typeof twttr !== "undefined") {
                    // dynamic loading of twitter
                    twttr?.widgets?.load($(".twitter-tweet"));
                }
            },
            getPageNo: () => {
                let url = window.location.pathname.split("/").pop();
                let page;
                if (url.indexOf("page-") > -1) {
                    let pageNo = url.split("-")[1];
                    page = "_page_" + pageNo;
                    return page;
                } else {
                    page = "_page_1";
                    return page;
                }
            },
            // end common functions

            // liveblog card
            createStoryLayout: (card) => {
                let liveBlogCard = $("<div/>", {
                    id: `lb-story-${card.card_id}`,
                    class: "col-12 lb-article-listing",
                }).append(
                    $("<div/>", { class: "row" }).append(
                        $("<div/>", {
                            class: "lb-article",
                        })
                            .append(
                                $("<div/>", {
                                    class: "update-anchor",
                                })
                            )
                            .append(
                                $("<div/>", {
                                    class: "lb-article-pvdot",
                                }).append(
                                    $("<span/>", {
                                        class: "lb-article-start",
                                    })
                                )
                            )
                            .append(
                                $("<div/>", {
                                    class: "lb-article-date",
                                    text: card.created_at,
                                })
                            )
                            .append(
                                $("<div/>", {
                                    class: "lb-article-title",
                                    text: card.key,
                                })
                            )
                            .append(
                                $("<div/>", {
                                    class: "lb-article-desc",
                                }).append(
                                    $("<div/>", {
                                        class: "col-12 article-content",
                                    })
                                )
                            )
                            .append(
                                $("<div/>", {
                                    class: "col-12",
                                }).append(
                                    $("<div/>", {
                                        class: "row p-0",
                                    })
                                        .append(
                                            $("<div/>", {
                                                class: "col-6 lb-article-read-more",
                                            })
                                        )
                                        .append(
                                            $("<div/>", {
                                                class: "col-6 lb-article-share",
                                            })
                                                .append(
                                                    $("<span/>", {
                                                        id:
                                                            "lb-article-share-icon-" +
                                                            card.card_id,
                                                        class: "icon icon-share lb-article-share-icon cursor_p icon-w-h-20",
                                                        "data-title": card.key,
                                                        "data-url": "",
                                                        "data-text": card.key,
                                                        "data-blogid": "",
                                                    })
                                                )
                                                .append(
                                                    $("<div/>", {
                                                        id:
                                                            "lb-default-share-" +
                                                            card.card_id,
                                                        class: "lb-default-share",
                                                        style: "display: none",
                                                    })
                                                        .append(
                                                            $("<a/>", {
                                                                class: "social_share_links",
                                                                href: "",
                                                                target: "__blank",
                                                                rel: "sponsored nofollow",
                                                            }).append(
                                                                $("<img/>", {
                                                                    class: "share_li entypo-facebook",
                                                                    src: "/assets/icons/fb.png",
                                                                })
                                                            )
                                                        )
                                                        .append(
                                                            $("<a/>", {
                                                                class: "social_share_links",
                                                                href: "",
                                                                target: "__blank",
                                                                rel: "sponsored nofollow",
                                                            }).append(
                                                                $("<img/>", {
                                                                    class: "share_li entypo-whatsapp",
                                                                    src: "/assets/icons/wh.png",
                                                                })
                                                            )
                                                        )
                                                )
                                        )
                                )
                            )
                    )
                );
                return liveBlogCard;
            },
            appendStoryContentToLayout: (storyContent, storyContentNode) => {
                let contentType = storyContent["type"];
                switch (contentType) {
                    case "text":
                        let text = `${storyContent["value"]}`;
                        storyContentNode.append($.parseHTML(text)[0]);
                        break;

                    case "image":
                        let image = `<p><img src="${
                            lbutils.IMAGE_BASE_PATH + storyContent["src"]
                        }" alt="${storyContent["caption"]}" title="${
                            storyContent["caption"]
                        }" /></p>`;
                        storyContentNode.append($.parseHTML(image)[0]);
                        break;

                    case "heading":
                        let heading = `<div class="lb-article-title">${storyContent["value"]}</div>`;
                        storyContentNode.append($.parseHTML(heading)[0]);
                        break;

                    case "social-media":
                        let socialMediaPlatformType = storyContent["platform"];
                        switch (socialMediaPlatformType) {
                            case "facebook":
                                let facebook = `<p></p><center><div class="fb-post" data-lazy="true" data-href="${storyContent["value"]}"></div></center><p></p>`;
                                storyContentNode.append(
                                    $.parseHTML(facebook)[0]
                                );
                                storyContentNode.append(
                                    $.parseHTML(facebook)[1]
                                );
                                storyContentNode.append(
                                    $.parseHTML(facebook)[2]
                                );

                                break;
                            case "instagram":
                                let instagram = `<p></p><center> ${storyContent["html"]} </center><p></p>`;
                                storyContentNode.append(
                                    $.parseHTML(instagram)[0]
                                );
                                storyContentNode.append(
                                    $.parseHTML(instagram)[1]
                                );
                                storyContentNode.append(
                                    $.parseHTML(instagram)[2]
                                );
                                break;
                            case "twitter":
                                let twitter = `<p></p><center>${storyContent["html"]}</center><p></p>`;
                                storyContentNode.append(
                                    $.parseHTML(twitter)[0]
                                );
                                storyContentNode.append(
                                    $.parseHTML(twitter)[1]
                                );
                                storyContentNode.append(
                                    $.parseHTML(twitter)[2]
                                );

                                break;
                        }
                        break;

                    case "video":
                        let videoPlatform = storyContent["platform"];
                        switch (videoPlatform) {
                            case "youtube":
                                let youtube = `<p></p><iframe title="${storyContent["caption"]}" width="757px" 
                            height="400px" src="https://www.youtube.com/embed/${storyContent["value"]}">
                            </iframe><p></p>`;
                                storyContentNode.append(
                                    $.parseHTML(youtube)[0]
                                );
                                storyContentNode.append(
                                    $.parseHTML(youtube)[1]
                                );
                                storyContentNode.append(
                                    $.parseHTML(youtube)[2]
                                );

                                break;
                            case "facebook":
                                let facebook = `<p></p><div class="fb-post" data-lazy="true" 
                            data-href="${storyContent["value"]}" data-width="757" data-height="400"></div><p></p>`;
                                storyContentNode.append(
                                    $.parseHTML(facebook)[0]
                                );
                                storyContentNode.append(
                                    $.parseHTML(facebook)[1]
                                );
                                storyContentNode.append(
                                    $.parseHTML(facebook)[2]
                                );
                                break;
                        }
                        break;

                    case "js-code":
                        let jsCode = `<p></p><center>${storyContent["javascript_code"]}</center><p></p>`;
                        storyContentNode.append($.parseHTML(jsCode));
                        storyContentNode.append($.parseHTML(jsCode)[0]);
                        storyContentNode.append($.parseHTML(jsCode)[1]);
                        storyContentNode.append($.parseHTML(jsCode)[2]);

                        break;

                    case "quote":
                        let quote = `<div>&nbsp;</div><div>
                        <div class="articleQuotes">
                          <div class="quotes">${storyContent["quote_text"]}</div>
                          <div class="quotesAuthor">${storyContent["quote_attribution"]}</div>
                        </div>
                      </div>
                      <div>&nbsp;</div>`;
                        storyContentNode.append($.parseHTML(quote)[0]);
                        break;
                }
            },
            deleteStory: (deletedStoryArr) => {
                let storyCardPresentOnDom = $("[id^='lb-story-']").map(
                    function (index, item) {
                        return "#" + item.id;
                    }
                );

                let storyCardPresentOnDomArr = storyCardPresentOnDom.toArray();

                $.each(deletedStoryArr, function (index, deletedStory) {
                    let deletedStoryId = "#lb-story-" + deletedStory["card_id"];

                    if (storyCardPresentOnDomArr.includes(deletedStoryId)) {
                        $("a[id=" + "'" + deletedStoryId + "'" + "]").remove();
                        $(deletedStoryId).remove();
                    }
                });
            },
            renderStoryOnDomAsPerIdPosition: (storyData, storyCardDomNode) => {
                let page = lbutils.getPageNo();
                if (page === "_page_1") {
                    currentStoryId = storyData["card_id"];
                    let idsOfStoryPresentOnDomArr = $("[id^='lb-story-']").map(
                        function (index, item) {
                            return item.id.split("-")[2];
                        }
                    );
                    topStoryId = Math.max.apply(
                        null,
                        idsOfStoryPresentOnDomArr
                    );
                    bottomStoryId = Math.min.apply(
                        null,
                        idsOfStoryPresentOnDomArr
                    );

                    if (currentStoryId > topStoryId) {
                        storyCardDomNode.prependTo(lbutils.storyContainer);
                    } else if (currentStoryId < bottomStoryId) {
                        storyCardDomNode.appendTo(lbutils.storyContainer);
                    } else {
                        idsOfStoryPresentOnDomArr.push(currentStoryId);
                        sortedStoryIdArr = idsOfStoryPresentOnDomArr.sort(
                            function (a, b) {
                                return a - b;
                            }
                        );
                        let previousStoryId;
                        $.each(sortedStoryIdArr, function (index, item) {
                            if (item === currentStoryId) {
                                previousStoryId =
                                    "lb-story-" + sortedStoryIdArr[index + 1];
                                return false;
                            }
                        });
                        storyCardDomNode.insertAfter(
                            $("[id=" + "'" + previousStoryId + "'" + "]")
                        );
                    }
                } else {
                    storyCardDomNode.prependTo(lbutils.storyContainer);
                }
            },
            renderStory: (latestStory, loadMore = false) => {
                let reRenderDueToUpdate;
                let previousCard;
                if (!loadMore) {
                    reRenderDueToUpdate = false;

                    // for card
                    let latestStoryId = "lb-story-" + latestStory["card_id"];

                    let isStoryExist = $("[id^='lb-story-']").filter(function (
                        index,
                        element
                    ) {
                        return latestStoryId === element.id;
                    });

                    isStoryExist.each(function () {
                        previousCard = $("#" + this.id).prev()[0];
                        reRenderDueToUpdate = true;
                        $(this).remove();
                    });
                }

                // render new card
                let storyCardNode = lbutils.createStoryLayout(latestStory);

                let storyContentNode =
                    storyCardNode[0].childNodes[0].childNodes[0].childNodes[4]
                        .childNodes[0];
                let storyDataArr = JSON.parse(latestStory.content);
                if (latestStory?.url) {
                    let readMore = `<a class="cp2" href="${latestStory?.url}">Read Full Article</a>`;
                    storyContentNode.parentElement.parentElement.childNodes[5].childNodes[0].childNodes[0].append(
                        $.parseHTML(readMore)[0]
                    );
                }
                if (Array.isArray(storyDataArr) && storyDataArr.length > 0) {
                    $.each(storyDataArr, function (index, storyData) {
                        lbutils.appendStoryContentToLayout(
                            storyData,
                            storyContentNode
                        );
                    });
                }

                if (loadMore) {
                    storyCardNode.appendTo(lbutils.storyContainer);
                } else {
                    if (reRenderDueToUpdate) {
                        if (previousCard) {
                            let previousCardId = previousCard.id;
                            if (previousCardId) {
                                storyCardNode.insertAfter(
                                    $("#" + previousCardId)
                                );
                            }
                        }

                        if (typeof previousCard === "undefined") {
                            lbutils.storyContainer.prepend(storyCardNode);
                        }
                        lbutils.reloadEmbeddedPostElements();
                    } else {
                        lbutils.renderStoryOnDomAsPerIdPosition(
                            latestStory,
                            storyCardNode
                        );
                        let totalCards = $("[id^='lb-story-']").length;
                        if (totalCards > 20) {
                            let lastCardId =
                                $("[id^='lb-story-']")[totalCards - 1].id;
                            $("#" + lastCardId).remove();
                        }
                        if (totalCards > 0 && this.articleDescription != 'undefined') {
                            this.articleDescription.remove();
                        }
                        lbutils.reloadEmbeddedPostElements();
                    }
                }
            },
            // end of live blog card

            // liveblog highlight
            createLiveBlogHighLightLayout: (highlight) => {
                let url = highlight?.url ? highlight.url : "";
                let liveBlogHighLight = $("<a/>", {
                    id: "lb-key-" + highlight["card_id"],
                    href: url || "javascript:;",
                    class: "lb-highlights-more-arrow",
                }).append(
                    $("<div/>", {
                        class: "lb-highlights-grid",
                    })
                        .append(
                            $("<div/>", {
                                class: "lb-highlights-text",
                                text: highlight["key"],
                            })
                        )
                        .append(
                            url
                                ? $("<span/>", {
                                      class: "icon icon-right-arrow-pink float-right",
                                  })
                                : null
                        )
                );
                return liveBlogHighLight;
            },
            renderHighLight: (latestHighLightCard) => {
                let previousHighLightCard;
                let reRenderDueToUpdate = false;

                // for key card
                let latestHighLightCardId =
                    "lb-key-" + latestHighLightCard["card_id"];

                let isKeyCardExist = $("a[id^='lb-key-']").filter(function (
                    index,
                    element
                ) {
                    return latestHighLightCardId === element.id;
                });

                isKeyCardExist.each(function () {
                    previousHighLightCard = $(
                        "a[id=" + "'" + this.id + "'" + "]"
                    ).prev()[0];
                    reRenderDueToUpdate = true;
                    $(this).remove();
                });

                let highLightCardNode =
                    lbutils.createLiveBlogHighLightLayout(latestHighLightCard);

                if (reRenderDueToUpdate) {
                    if (previousHighLightCard) {
                        let previousHighLightCardId = previousHighLightCard.id;
                        if (previousHighLightCardId) {
                            highLightCardNode.insertAfter(
                                $(
                                    "a[id=" +
                                        "'" +
                                        previousHighLightCardId +
                                        "'" +
                                        "]"
                                )
                            );
                        }
                    }

                    if (typeof previousHighLightCard === "undefined") {
                        highLightCardNode.prependTo(lbutils.highLightContainer);
                    }
                } else {
                    lbutils.renderHighLightOnDomAsPerIdPosition(
                        latestHighLightCard,
                        highLightCardNode
                    );
                    let totalKeys = $("a[id^='lb-key-']").length;
                    if (totalKeys > 10) {
                        let deleteId = $("a[id^='lb-key-']")[totalKeys - 1].id;
                        $("a[id=" + "'" + deleteId + "'" + "]").remove();
                    }
                }
            },
            renderHighLightOnDomAsPerIdPosition: (
                latestHighLightCard,
                highLightCardNode
            ) => {
                let currentHighLightId = latestHighLightCard["card_id"];
                let idsOfhighLightPresentOnDomArr = $("a[id^='lb-key-']").map(
                    function (index, item) {
                        return item.id.split("-")[2];
                    }
                );

                if (idsOfhighLightPresentOnDomArr.length > 0) {
                    highLightTopId = Math.max.apply(
                        null,
                        idsOfhighLightPresentOnDomArr
                    );
                    highLightBottomId = Math.min.apply(
                        null,
                        idsOfhighLightPresentOnDomArr
                    );

                    if (currentHighLightId > highLightTopId) {
                        highLightCardNode.prependTo(lbutils.highLightContainer);
                    } else if (currentHighLightId < highLightBottomId) {
                        highLightCardNode.appendTo(lbutils.highLightContainer);
                    } else {
                        idsOfhighLightPresentOnDomArr.push(currentHighLightId);
                        liveBlogHighLightCardSortedArr =
                            idsOfhighLightPresentOnDomArr.sort(function (a, b) {
                                return a - b;
                            });

                        let previousHighLightCard;
                        $.each(
                            liveBlogHighLightCardSortedArr,
                            function (index, item) {
                                if (item === currentHighLightId) {
                                    previousHighLightCard =
                                        "lb-key-" +
                                        liveBlogHighLightCardSortedArr[
                                            index + 1
                                        ];
                                    return false;
                                }
                            }
                        );
                        highLightCardNode.insertAfter(
                            $("a[id=" + "'" + previousHighLightCard + "'" + "]")
                        );
                    }
                } else {
                    highLightCardNode.prependTo(lbutils.highLightContainer);
                }
            },
            deleteHighLight: (deletedHighLightArr) => {
                let highLightCardPresentOnDom = $("a[id^='lb-key-']").map(
                    function (index, item) {
                        return item.id;
                    }
                );

                let highLightCardPresentOnDomArr =
                    highLightCardPresentOnDom.toArray();

                $.each(deletedHighLightArr, function (index, deletedHighLight) {
                    let deletedHighLightId =
                        "lb-key-" + deletedHighLight["card_id"];

                    if (
                        highLightCardPresentOnDomArr.includes(
                            deletedHighLightId
                        )
                    ) {
                        $(
                            "a[id=" + "'" + deletedHighLightId + "'" + "]"
                        ).remove();
                    }
                });
            },
            // end of live blog highlight

            // timeout call function for liveblog
            updateLiveBlog: () => {
                let storyTime = $("#latest-story-updated-at").val();
                let highLightTime = $("#latest-highlight-updated-at").val();
                let data = {
                    articleId: lbutils.articleId,
                    highLightTime: highLightTime,
                    storyTime: storyTime,
                    page: 1,
                    isLoadMore: false,
                };
                $.ajax({
                    url: "/ajax/post/live-blog",
                    type: "POST",
                    data: data,
                    dataType: "json",
                    async: false,
                    success: (response) => {
                        let latestStoryArr = response["latest_cards"]
                            ? response["latest_cards"]
                            : [];
                        let latestHighLightArr = response["latest_keys"]
                            ? response["latest_keys"]
                            : [];
                        let deletedStoryArr = response["deleted_cards"]
                            ? response["deleted_cards"]
                            : [];
                        let deletedHighLightArr = response[
                            "deleted_or_status_off_keys"
                        ]
                            ? response["deleted_or_status_off_keys"]
                            : [];
                        let latestTimeOfStory =
                            response["article_updated_time"];
                        let latestTimeOfHighLight =
                            response["key_updated_time"];

                        // for cards
                        if (latestStoryArr.length > 0) {
                            $.each(latestStoryArr, (index, latestStoryCard) => {
                                lbutils.renderStory(latestStoryCard);
                            });
                        }

                        // for keys
                        if (latestHighLightArr.length > 0) {
                            $.each(
                                latestHighLightArr,
                                (index, latestHighLightCard) => {
                                    lbutils.renderHighLight(
                                        latestHighLightCard
                                    );
                                }
                            );
                        }

                        // deleted card
                        if (deletedStoryArr.length > 0) {
                            lbutils.deleteStory(deletedStoryArr);
                        }

                        if (deletedHighLightArr.length > 0) {
                            lbutils.deleteHighLight(deletedHighLightArr);
                        }

                        // latest updated time
                        if (latestTimeOfStory) {
                            $("#latest-story-updated-at").attr(
                                "value",
                                latestTimeOfStory
                            );
                        }

                        // latest updated time of key
                        if (latestTimeOfHighLight) {
                            $("#latest-highlight-updated-at").attr(
                                "value",
                                latestTimeOfHighLight
                            );
                        }
		        if (window.instgrm && window.instgrm.Embeds) {
      				window.instgrm.Embeds.process();
    			}	
                    },
                    complete: () => {
                        setTimeout(() => {
                            return lbutils.updateLiveBlog();
                        }, 15000);
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            },
            // load more liveblog cards on click
            liveBlogLoadMore: (e) => {
                e.stopPropagation();
                e.preventDefault();

                lbutils.moreUpdatesButton[0].text = "Loading...";
                let storyTime = $("#latest-story-updated-at").val();
                let highLightTime = $("#latest-highlight-updated-at").val();
                lbutils.pageNo += 1;

                let data = {
                    articleId: lbutils.articleId,
                    highLightTime: highLightTime,
                    storyTime: storyTime,
                    page: lbutils.pageNo,
                    isLoadMore: true,
                };

                $.ajax({
                    url: "/ajax/post/live-blog",
                    type: "POST",
                    data: data,
                    dataType: "json",
                    success: (response) => {
                        if (response["status"] === "success") {
                            let liveCards = response["liveCards"];
                            // for cards
                            if (liveCards.length > 0) {
                                $.each(
                                    liveCards,
                                    function (index, latestStory) {
                                        lbutils.renderStory(latestStory, true);
                                    }
                                );
                            }
                            lbutils.reloadEmbeddedPostElements();
                        }
                        if (lbutils.pageNo >= lbutils.totalPage) {
                            lbutils.moreUpdatesButton.hide();
                        } else {
                            lbutils.moreUpdatesButton[0].text =
                                "See More Updates";
                        }
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            },
        };
        return lbutils;
    });
    lbutils.bindEvents();
    if (lbutils.liveBlogStatus) {
        lbutils.updateLiveBlog();
    }
});
