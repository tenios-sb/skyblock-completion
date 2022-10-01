function getLeaderboard(db, page, mode = 'all', guild = null, category = null) {
    let query = [];
    const stat = category || 'null';
    const path = category ? (category === 'sbXp' ? 'sbXp' : `completions.${category}.value`) : 'completion'

    if (guild)
        query.push({
            $match: {
                guild
            }
        })
    query.push(
        {
            $project: {
                _id: 1,
                name: 1,
                guild: 1,
                profile: {
                    $reduce: {
                        input: "$profiles",
                        initialValue: {
                            completion: 0, completions: {
                                [stat]: { value: 0 }
                            }
                        },
                        in: {
                            $cond: [(mode !== 'all' ? {
                                $and: [
                                    {
                                        $gte: [`$$this.${path}`, `$$value.${path}`]
                                    }, {
                                        $eq: ["$$this.mode", mode]
                                    }]
                            } : {
                                $gte: [`$$this.${path}`, `$$value.${path}`]
                            }),
                                "$$this",
                                "$$value"
                            ]
                        }
                    }
                }

            }
        }, {
        $project: {
            _id: 1,
            name: 1,
            guild: 1,
            completion: "$profile.completion",
            mode: "$profile.mode",
            profileName: "$profile.name",
            index: `$profile.${path}`
        }
    }
    )
    return db.collection('players').aggregate(query, {
        collation:
            { locale: 'en', strength: 2 }
    }).sort({
        index: -1
    }).skip((page - 1) * 20).limit(20);
}

module.exports = getLeaderboard