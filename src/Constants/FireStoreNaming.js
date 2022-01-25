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
                    },
                    workAndEducation: {
                        documentName: "workAndEducation",
                        documentField: {
                            workplace: "workplace",
                            university: "university",
                            highSchool: "highSchool"
                        }
                    },
                    placesLived: {
                        documentName: "placesLived",
                        documentField: {
                            currentCity: "currentCity",
                            hometown: "hometown",
                        }
                    },
                    contactAndBasicInfo: {
                        documentName: "contactAndBasicInfo",
                        documentField: {
                            mobile: "mobile",
                            email: "email",
                            website: "website",
                        }
                    },
                    familyAndRelationships: {
                        documentName: "familyAndRelationships",
                        documentField: {
                            relationship: "relationship",
                            familyMembers: "familyMembers",
                        }
                    },
                    detailsAboutYou: {
                        documentName: "detailsAboutYou",
                        documentField: {
                            aboutYou: "aboutYou",
                            namePronunciation: "namePronunciation",
                            otherName: "otherName",
                            favoriteQuotes: "favoriteQuotes"
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