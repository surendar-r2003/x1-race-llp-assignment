document.addEventListener("DOMContentLoaded", function () {
    let nextArticle = {
        initializeVariables: function (e) {
            this.loadMoreComment = false;
	    const myComment = document.getElementById("more-comment");
	    if(myComment){
            this.start = myComment.getAttribute("data-id");
	    }else{
	    this.start = 10;
	    }
            this.articleData = JSON.parse($(".article-data").val());
            this.articleId = this.articleData["articleId"];
            this.articleTypeName = this.articleData["articleTypeName"];
            this.section = this.articleData["section"];
            this.subSection = this.articleData["subSection"];
            this.staticReplyClicked = $(".c-reply");
            this.replyClicked = $(".load-comments");
            this.viewMoreComment = $("#more-comment");
            this.articleComment = $("#article_comment");
            this.loadCommentLoader = $(".loader");
            this.viewReplies = $(".v-reply");
            this.replyClose = $(".add-comment");
            // this.replyClose = $('.summary');
        },
        bindEvents: function (e) {
            $(window).on("scroll", this.loadNextArticles.bind(this));
            $("#main").delegate(
                ".add-comment-btn",
                "click",
                this.postComments.bind(this)
            );
            this.replyClicked.delegate(
                ".c-reply",
                "click",
                this.onReplyClicked.bind(this)
            );
            this.staticReplyClicked.on("click", this.onReplyClicked.bind(this));
            this.viewMoreComment.on("click", this.onViewMoreComment.bind(this));
            this.viewReplies.on("click", this.onViewReplies.bind(this));
            this.replyClose.delegate(
                "#reply_to_close",
                "click",
                this.onReplyClosed.bind(this)
            );
            this.replyClicked.delegate(
                ".v-reply",
                "click",
                this.onViewReplies.bind(this)
            );
        },
        loadNextArticles: function (e) {
            if (
                window.pageYOffset >=
                document.documentElement.clientHeight * 0.3
            ) {
                $.ajax({
                    url: "/ajax/post/get-next-story",
                    type: "POST",
                    data: {
                        articleId: this.articleId,
                        articleTypeName: this.articleTypeName,
                        section: this.section,
                        subSection: this.subSection,
                    },
                    dataType: "json",
                    success: (response) => {
                        if (response?.response !== undefined) {
                            document
                                .querySelector(".on-scroll-load-articles")
                                .insertAdjacentHTML(
                                    "afterbegin",
                                    response?.response
                                );

                            pvutils.lazyloadImage();
                            pvutils.reloadEmbeddedPost();
                            if (typeof twttr === "undefined") {
                                const observerNextArticleTwitter = lozad(
                                    ".lozad",
                                    {
                                        load: (el) => {
                                            const bq =
                                                document.createElement(
                                                    "blockquote"
                                                );
                                            bq.className = "twitter-tweet";

                                            const p =
                                                document.createElement("p");
                                            p.lang = "en";
                                            p.dir = "ltr";
                                            bq.appendChild(p);

                                            const twitterSrc =
                                                el.dataset.twitterSrc;
                                            const a =
                                                document.createElement("a");
                                            a.href = twitterSrc;
                                            bq.appendChild(a);

                                            const script =
                                                document.createElement(
                                                    "script"
                                                );
                                            script.src =
                                                "https://platform.twitter.com/widgets.js";
                                            script.charset = "utf-8";
                                            script.async = true;

                                            el.insertAdjacentElement(
                                                "beforeEnd",
                                                bq
                                            );
                                            el.insertAdjacentElement(
                                                "beforeEnd",
                                                script
                                            );
                                        },
                                    }
                                );
                                observerNextArticleTwitter.observe();
                            }
                        }
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
                $(window).unbind("scroll");
            }
        },
        postComments: function (e) {
            let articleId = JSON.parse(e.target.previousElementSibling.value)[
                "articleId"
            ];
            let comment =
                e.target.parentElement.previousElementSibling.children[0].value;
            e.target.parentElement.previousElementSibling.children[0].value =
                "";
            $("#article_comment").val("");
            let parent_id = null;
            let id = $("#replies-to").val();
            let user_id = $("#user_id").val();
            if (id) {
                parent_id = id;
            }
            $("#replies-to").val("");
            $("#pr-reply-to-section").remove();
            if (comment.length < 2) {
                pvutils.getToastContent(
                    "Enter valid comment text!!",
                    "auto",
                    "60"
                );
            } else {
                this.articleComment.val("");
                pvutils.getToastContent(
                    "Comment published for moderation!!",
                    "auto",
                    "60",
                    1
                );
                $.ajax({
                    url: "/ajax/post/post-comment",
                    type: "POST",
                    data: {
                        articleId: articleId,
                        comment: comment,
                        parent_id: parent_id,
                        user_id: user_id,
                    },
                    dataType: "json",
                    async: false,
                    success: (response) => {},
                    error: (error) => {
                        console.log(error);
                    },
                });
            }
        },
        onReplyClicked: function (e) {
            const el = $("#article_comment");
            let data = JSON.parse(e.target.id);
            $("#pr-reply-to-section").remove();
            document
                .querySelector(".add-comment")
                .insertAdjacentHTML(
                    "afterbegin",
                    '<div id="pr-reply-to-section" class="row">\n' +
                        '<div id="" class="col-1 mw-30"></div>\n' +
                        '<div id="pr-reply-to-content" class="pr-reply-to-content col-9 f14">You\n' +
                        "are replying to\n" +
                        '<div id="reply_to_user" class="reply_to_user">' +
                        data.username +
                        "</div>\n" +
                        '<div id="reply_to_close" class="reply_to_close">x</div>\n' +
                        "</div>\n" +
                        "</div>"
                );
            $("#replies-to").val(data.id);
            $("html, body").animate(
                {
                    scrollTop: el?.offset()?.top,
                },
                1000
            );
        },
        onReplyClosed: function (e) {
            $("#replies-to").val("");
            $("#pr-reply-to-section").remove();
        },
        onViewMoreComment: function (e) {
            if (!this.loadMoreComment) {
                this.loadMoreComment = true;
                $(".hide-comment").removeClass("hide");
		var comment_count = $("#comments-list .ar-article").length;
		var total_comment = $("#more-comment").attr("data-total");
		if (comment_count < 10) {
			$("#more-comment").addClass("hide");
		}else if(total_comment > comment_count){
			let rem_rec = total_comment - comment_count;
			$("#more-comment").html('<a id="more-comment" href="javascript:void(0)" data-id="10" class="view-more f14" rel="sponsored nofollow">View more ('+rem_rec+') comments</a>');
		}
            } else {
                // this.loadCommentLoader.removeClass('hide');
                // this.loadCommentLoader.addClass('load-comments-loader');

                $.ajax({
                    url: "/ajax/post/get-comments",
                    type: "POST",
                    data: { articleId: this.articleId, start: this.start },
                    dataType: "json",
                    success: (response) => {
                        // this.loadCommentLoader.removeClass('load-comments-loader');
                        // this.loadCommentLoader.addClass('hide');
                        if (response?.response === "") {
                            $("#more-comment").addClass("hide");
                        } else {
                            if (response?.response !== undefined) {
                                /*document
                                    .querySelector(".load-comments")
                                    .insertAdjacentHTML(
                                        "afterend",
                                        response?.response
                                    );*/
				let moreCommentElm = document.getElementById("more-comment");
				moreCommentElm.classList.remove("hide");
				let commentsListElm = document.getElementById("comments-list");
				 commentsListElm.innerHTML += response?.response;
				if (response.remianing > 0) {
           				 moreCommentElm.innerHTML = '<a id="more-comment" href="javascript:void(0)" data-id="10" class="view-more f14" rel="sponsored nofollow">View more ('+response.remianing+') comments</a>';
          			} else {
            				moreCommentElm.innerHTML = ''; 
          			}
                                this.start = parseInt(this.start) + 10;
				$(".v-reply").on("click", this.onViewReplies.bind(this));
                            }
                        }
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            }
        },
        onViewReplies: function (e) {
            $.ajax({
                url: "/ajax/post/get-replies",
                type: "POST",
                data: { articleId: this.articleId, parent_id: e.target.id },
                dataType: "json",
                success: (response) => {
                    let replyClass = $("#" + e.target.id);
                    if (response?.response === "") {
                        replyClass.addClass("hide");
                    } else {
                        document
                            .querySelector(".reply-" + e.target.id)
                            .insertAdjacentHTML(
                                "afterbegin",
                                response?.response
                            );
                        if (response?.count < 10) {
                            replyClass.addClass("hide");
                        }
                        //     this.start = this.start + 10;
                    }
                },
                error: (error) => {
                    console.log(error);
                },
            });
        },
        compile: function (e) {
            this.initializeVariables();
            this.bindEvents();
        },
    };

    nextArticle.compile();

    $("body").delegate(".icon-like", "click", function (e) {
        let ids = e.target.nextElementSibling.id.split("-");
        let articleId = ids[2];
        let commentId = ids[3];
        let data = {
            article_id: articleId,
            comment_id: commentId,
        };
        if (!localStorage.getItem("like-count-" + articleId)) {
            let array = [];
            let count = parseInt(e.target.nextElementSibling.textContent);
            array.push(commentId);
            let object = JSON.stringify(array);
            localStorage.setItem("like-count-" + articleId, object);
            count++;
            e.target.nextElementSibling.textContent = count;
            data.type = "comment_like_increment";
            $.ajax({
                url: "/ajax/post/comment-like",
                type: "POST",
                data: data,
                dataType: "json",
                success: (response) => {},
                error: (error) => {
                    console.log(error);
                },
            });
        } else {
            let count = parseInt(e.target.nextElementSibling.textContent);
            let likesArr = localStorage.getItem("like-count-" + articleId);
            if (likesArr.length > 0) {
                let array = JSON.parse(likesArr);
                if (array.includes(commentId)) {
                    if (count == 0) {
                        data.type = "comment_like_decrement";
                    } else if (count > 0) {
                        count--;
                        e.target.nextElementSibling.textContent = count;
                        data.type = "comment_like_decrement";
                    }
                    array.splice(array.indexOf(commentId), 1);
                    localStorage.setItem(
                        "like-count-" + articleId,
                        JSON.stringify(array)
                    );
                } else {
                    array.push(commentId);
                    localStorage.setItem(
                        "like-count-" + articleId,
                        JSON.stringify(array)
                    );
                    count++;
                    e.target.nextElementSibling.textContent = count;
                    data.type = "comment_like_increment";
                }
            }
            $.ajax({
                url: "/ajax/post/comment-like",
                type: "POST",
                data: data,
                dataType: "json",
                success: (response) => {},
                error: (error) => {
                    console.log(error);
                },
            });
        }
    });
});
