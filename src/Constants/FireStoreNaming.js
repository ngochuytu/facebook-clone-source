export const firebaseCollections = {
    users: {
        collectionName: "users",
        documents: {
            documentField: {
                displayName: "displayName",
                photoURL: "photoURL",
                uid: "uid"
            }
        },
        subCollections: {
            notifications: {
                collectionName: "notifications",
                documents: {
                    notificationsDetails: {
                        documentName: "notificationsDetails",
                        documentField: {
                            numbersOfNewNotifications: "numbersOfNewNotifications"
                        }
                    }
                },
                subCollections: {
                    notificationsList: {
                        collectionName: "notificationsList",
                        documents: {
                            documentField: {
                                commentContent: "commentContent",
                                id: "id",
                                interactedUid: "interactedUid",
                                interactionType: "interactionType",
                                postId: "postId",
                                read: "read",
                                timeStamp: "timeStamp"
                            }
                        }
                    }
                }
            },
            about: {
                collectionName: "about",
                documents: {
                    overview: {
                        documentName: "overview",
                        documentField: {
                            workplace: "workplace",
                            highSchool: "highSchool",
                            university: "university",
                            currentCity: "currentCity",
                            hometown: "hometown"
                        }
                    }
                }
            }
        }
    },
    posts: {
        collectionName: "posts",
        documents: {
            documentField: {
                attachmentFullPath: "attachmentFullPath",
                attachmentPreviewURL: "attachmentPreviewURL",
                content: "content",
                id: "id",
                timeStamp: "timeStamp",
                uid: "uid"
            }
        },
        subCollections: {
            interactions: {
                collectionName: "interactions",
                documents: {
                    documentField: {
                        interactionType: "interactionType",
                        timeStamp: "timeStamp",
                        uid: "uid"
                    }
                }
            },
            comments: {
                collectionName: "comments",
                documents: {
                    documentField: {
                        content: "content",
                        id: "id",
                        timeStamp: "timeStamp",
                        uid: "uid"
                    }
                }
            }
        }
    },
};