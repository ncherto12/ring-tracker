// ==================================================
// Ring Tracker
// ==================================================

const DAY_MS =
    24 *
    60 *
    60 *
    1000;

const HOUR_MS =
    60 *
    60 *
    1000;

const STORAGE_KEY =
    "ringHistory";



// ==================================================
// DOM
// ==================================================

const $ =
    (id) =>
        document.getElementById(
            id
        );


const cycleRingShell =
    $("cycle-ring-shell");

const cycleRing =
    $("cycle-ring");

const cycleMarkers =
    $("cycle-markers");

const cycleCurrentMarker =
    $("cycle-current-marker");

const cycleStatus =
    $("cycle-status");

const cycleDayNumber =
    $("cycle-day-number");

const cycleDayLabel =
    $("cycle-day-label");

const cycleCountdown =
    $("cycle-countdown");


const openRingActionsButton =
    $("open-ring-actions");

const openBleedingActionsButton =
    $("open-bleeding-actions");


const medicalAlertsCard =
    $("medical-alerts-card");

const medicalAlertsList =
    $("medical-alerts-list");


const insightsGrid =
    $("insights-grid");

const nextActionName =
    $("next-action-name");

const nextActionDate =
    $("next-action-date");

const bleedingPredictionCard =
    $("bleeding-prediction-card");

const bleedingPredictionDate =
    $("bleeding-prediction-date");

const bleedingPredictionBasis =
    $("bleeding-prediction-basis");


const calendarPrevButton =
    $("calendar-prev-button");

const calendarNextButton =
    $("calendar-next-button");

const calendarMonthTitle =
    $("calendar-month-title");

const calendarGrid =
    $("calendar-grid");

const calendarSelectedDate =
    $("calendar-selected-date");

const calendarDaySummary =
    $("calendar-day-summary");

const calendarSelectedEvents =
    $("calendar-selected-events");


const historyList =
    $("history-list");


const settingsButton =
    $("settings-button");

const settingsBackButton =
    $("settings-back-button");

const bottomNav =
    $("bottom-nav");

const predictionSettingsSummary =
    $("prediction-settings-summary");

const exportDataButton =
    $("export-data-button");

const importDataButton =
    $("import-data-button");

const importDataInput =
    $("import-data-input");

const resetDataButton =
    $("reset-data-button");



const sheetBackdrop =
    $("sheet-backdrop");

const sheetTitle =
    $("sheet-title");

const closeSheetButton =
    $("close-sheet-button");

const ringSheet =
    $("ring-sheet");

const bleedingSheet =
    $("bleeding-sheet");

const ringDefaultActions =
    $("ring-default-actions");

const sheetInsertButton =
    $("sheet-insert-button");

const sheetRemoveButton =
    $("sheet-remove-button");

const sheetTemporaryOutButton =
    $("sheet-temporary-out-button");

const ringCustomTime =
    $("ring-custom-time");

const ringActionDatetime =
    $("ring-action-datetime");

const afterRemovalOptions =
    $("after-removal-options");

const startBreakButton =
    $("start-break-button");

const immediateReplacementButton =
    $("immediate-replacement-button");

const cancelRemovalButton =
    $("cancel-removal-button");

const temporaryOutForm =
    $("temporary-out-form");

const temporaryOutStart =
    $("temporary-out-start");

const temporaryOutEnd =
    $("temporary-out-end");

const saveTemporaryOutButton =
    $("save-temporary-out-button");

const cancelTemporaryOutButton =
    $("cancel-temporary-out-button");

const sheetBleedingStartButton =
    $("sheet-bleeding-start-button");

const sheetBleedingEndButton =
    $("sheet-bleeding-end-button");

const bleedingSheetStatus =
    $("bleeding-sheet-status");

const bleedingCustomTime =
    $("bleeding-custom-time");

const bleedingActionDatetime =
    $("bleeding-action-datetime");



let calendarViewDate =
    new Date();

calendarViewDate.setDate(
    1
);


let pendingRemovalDate =
    null;



// ==================================================
// תאריכים
// ==================================================

const dateTimeFormatter =
    new Intl.DateTimeFormat(
        "he-IL",
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"
        }
    );


const friendlyDateFormatter =
    new Intl.DateTimeFormat(
        "he-IL",
        {
            day:
                "numeric",

            month:
                "long"
        }
    );


const shortDateFormatter =
    new Intl.DateTimeFormat(
        "he-IL",
        {
            day:
                "numeric",

            month:
                "numeric",

            year:
                "2-digit"
        }
    );


const fullDateFormatter =
    new Intl.DateTimeFormat(
        "he-IL",
        {
            weekday:
                "long",

            day:
                "numeric",

            month:
                "long",

            year:
                "numeric"
        }
    );


const monthFormatter =
    new Intl.DateTimeFormat(
        "he-IL",
        {
            month:
                "long",

            year:
                "numeric"
        }
    );


const monthNameFormatter =
    new Intl.DateTimeFormat(
        "he-IL",
        {
            month:
                "long"
        }
    );



/**
 * @param {Date} date
 */
function formatDateTime(
    date
) {

    return dateTimeFormatter.format(
        date
    );
}



/**
 * @param {Date} date
 */
function formatFriendlyDate(
    date
) {

    return friendlyDateFormatter.format(
        date
    );
}



/**
 * @param {Date} date
 */
function formatShortDate(
    date
) {

    return shortDateFormatter.format(
        date
    );
}



/**
 * @param {Date} date
 */
function formatInputDate(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() +
            1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    const hour =
        String(
            date.getHours()
        ).padStart(
            2,
            "0"
        );


    const minute =
        String(
            date.getMinutes()
        ).padStart(
            2,
            "0"
        );


    return (
        `${year}-${month}-${day}` +
        `T${hour}:${minute}`
    );
}



function isSameDay(
    first,
    second
) {

    return (
        first.getFullYear() ===
            second.getFullYear() &&

        first.getMonth() ===
            second.getMonth() &&

        first.getDate() ===
            second.getDate()
    );
}



function startOfDay(
    date
) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}



function endOfDay(
    date
) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999
    );
}



function addDays(
    date,
    days
) {

    const copy =
        new Date(
            date.getTime()
        );


    copy.setDate(
        copy.getDate() +
        days
    );


    return copy;
}



/*
 * חשוב:
 * היום מתחלף בחצות.
 *
 * אנחנו משווים תאריכים קלנדריים,
 * ולא מספר מדויק של 24 שעות.
 *
 * לכן אם הכנסת טבעת אתמול בערב,
 * אחרי חצות את כבר ביום 2.
 */

function calendarDayDifference(
    fromDate,
    toDate
) {

    const fromUTC =
        Date.UTC(
            fromDate.getFullYear(),
            fromDate.getMonth(),
            fromDate.getDate()
        );


    const toUTC =
        Date.UTC(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate()
        );


    return Math.floor(
        (
            toUTC -
            fromUTC
        ) /
        DAY_MS
    );
}



function median(
    values
) {

    if (
        values.length ===
        0
    ) {

        return null;
    }


    const sorted =
        [...values].sort(
            function (
                first,
                second
            ) {

                return (
                    first -
                    second
                );
            }
        );


    const middle =
        Math.floor(
            sorted.length /
            2
        );


    if (
        sorted.length %
        2
    ) {

        return sorted[
            middle
        ];
    }


    return (
        sorted[
            middle - 1
        ] +
        sorted[
            middle
        ]
    ) / 2;
}



// ==================================================
// אחסון
// ==================================================

function getHistory() {

    try {

        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (
            !raw
        ) {

            return [];
        }


        const history =
            JSON.parse(
                raw
            );


        if (
            !Array.isArray(
                history
            )
        ) {

            return [];
        }


        return history.sort(
            function (
                first,
                second
            ) {

                return (
                    new Date(
                        first.date
                    ).getTime() -

                    new Date(
                        second.date
                    ).getTime()
                );
            }
        );

    } catch (
        error
    ) {

        console.error(
            "History error:",
            error
        );


        return [];
    }
}



function saveHistory(
    history
) {

    history.sort(
        function (
            first,
            second
        ) {

            return (
                new Date(
                    first.date
                ).getTime() -

                new Date(
                    second.date
                ).getTime()
            );
        }
    );


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            history
        )
    );
}



function createId() {

    return (
        Date.now() +
        Math.floor(
            Math.random() *
            1000
        )
    );
}



function saveEvent(
    type,
    date
) {

    const history =
        getHistory();


    history.push(
        {
            id:
                createId(),

            type:
                type,

            date:
                date.toISOString(),

            timingStatus:
                null,

            bleedingDuration:
                null
        }
    );


    saveHistory(
        history
    );
}



function saveTemporaryOut(
    outDate,
    returnDate
) {

    const history =
        getHistory();


    history.push(
        {
            id:
                createId(),

            type:
                "temporaryOut",

            date:
                outDate.toISOString(),

            returnDate:
                returnDate.toISOString(),

            timingStatus:
                null,

            bleedingDuration:
                null
        }
    );


    saveHistory(
        history
    );
}



// ==================================================
// מצב הטבעת
// ==================================================

function getLastRingEvent() {

    const history =
        getHistory();


    for (
        let index =
            history.length -
            1;

        index >=
        0;

        index--
    ) {

        if (
            history[
                index
            ].type ===
                "insertion" ||

            history[
                index
            ].type ===
                "removal"
        ) {

            return history[
                index
            ];
        }
    }


    return null;
}



function findPreviousInsertion(
    history,
    removalId
) {

    const index =
        history.findIndex(
            function (
                event
            ) {

                return (
                    event.id ===
                    removalId
                );
            }
        );


    if (
        index ===
        -1
    ) {

        return null;
    }


    for (
        let current =
            index - 1;

        current >=
        0;

        current--
    ) {

        if (
            history[
                current
            ].type ===
            "insertion"
        ) {

            return history[
                current
            ];
        }


        if (
            history[
                current
            ].type ===
            "removal"
        ) {

            break;
        }
    }


    return null;
}



function getCurrentCycleContext() {

    const history =
        getHistory();


    const last =
        getLastRingEvent();


    if (
        !last
    ) {

        return null;
    }


    if (
        last.type ===
        "insertion"
    ) {

        return {
            phase:
                "ring",

            insertion:
                last,

            removal:
                null
        };
    }


    return {
        phase:
            "break",

        insertion:
            findPreviousInsertion(
                history,
                last.id
            ),

        removal:
            last
    };
}



// ==================================================
// סטטוס הקדמה / איחור
// ==================================================

function calculateTimingStatus(
    planned,
    actual
) {

    const diffMinutes =
        Math.round(
            (
                actual.getTime() -
                planned.getTime()
            ) /
            60000
        );


    if (
        Math.abs(
            diffMinutes
        ) <
        5
    ) {

        return "בדיוק בזמן";
    }


    const total =
        Math.abs(
            diffMinutes
        );


    const days =
        Math.floor(
            total /
            1440
        );


    const hours =
        Math.floor(
            (
                total %
                1440
            ) /
            60
        );


    const minutes =
        total %
        60;


    const parts =
        [];


    if (
        days
    ) {

        parts.push(
            `${days} ימים`
        );
    }


    if (
        hours
    ) {

        parts.push(
            `${hours} שעות`
        );
    }


    if (
        !days &&
        minutes
    ) {

        parts.push(
            `${minutes} דקות`
        );
    }


    if (
        diffMinutes >
        0
    ) {

        return (
            `באיחור של ${parts.join(
                " ו־"
            )}`
        );
    }


    return (
        `מוקדם ב־${parts.join(
            " ו־"
        )}`
    );
}



function recalculateTimingStatuses() {

    const history =
        getHistory();


    history.forEach(
        function (
            event
        ) {

            if (
                event.type !==
                "removal"
            ) {

                return;
            }


            const insertion =
                findPreviousInsertion(
                    history,
                    event.id
                );


            if (
                !insertion
            ) {

                event.timingStatus =
                    null;

                return;
            }


            const planned =
                addDays(
                    new Date(
                        insertion.date
                    ),
                    21
                );


            event.timingStatus =
                calculateTimingStatus(
                    planned,
                    new Date(
                        event.date
                    )
                );
        }
    );


    saveHistory(
        history
    );
}



// ==================================================
// דימום
// ==================================================

function getActiveBleedingStart() {

    let active =
        null;


    getHistory().forEach(
        function (
            event
        ) {

            if (
                event.type ===
                "bleedingStart"
            ) {

                active =
                    event;
            }


            if (
                event.type ===
                "bleedingEnd"
            ) {

                active =
                    null;
            }
        }
    );


    return active;
}



function calculateBleedingDurations() {

    const history =
        getHistory();


    let activeStart =
        null;


    history.forEach(
        function (
            event
        ) {

            if (
                event.type ===
                "bleedingStart"
            ) {

                activeStart =
                    event;
            }


            if (
                event.type ===
                    "bleedingEnd" &&
                activeStart
            ) {

                const hours =
                    (
                        new Date(
                            event.date
                        ).getTime() -

                        new Date(
                            activeStart.date
                        ).getTime()
                    ) /
                    HOUR_MS;


                const days =
                    Math.floor(
                        hours /
                        24
                    );


                const remainingHours =
                    Math.round(
                        hours %
                        24
                    );


                if (
                    days >
                    0
                ) {

                    event.bleedingDuration =
                        `${days} ימים` +
                        (
                            remainingHours
                                ?
                                ` ו־${remainingHours} שעות`
                                :
                                ""
                        );

                } else {

                    event.bleedingDuration =
                        `${Math.max(
                            1,
                            remainingHours
                        )} שעות`;
                }


                activeStart =
                    null;
            }
        }
    );


    saveHistory(
        history
    );
}



function getBleedingEpisodes() {

    const history =
        getHistory();


    const episodes =
        [];


    for (
        let index =
            0;

        index <
        history.length;

        index++
    ) {

        if (
            history[
                index
            ].type !==
            "bleedingStart"
        ) {

            continue;
        }


        let end =
            null;


        for (
            let next =
                index + 1;

            next <
            history.length;

            next++
        ) {

            if (
                history[
                    next
                ].type ===
                "bleedingEnd"
            ) {

                end =
                    history[
                        next
                    ];

                break;
            }


            if (
                history[
                    next
                ].type ===
                "bleedingStart"
            ) {

                break;
            }
        }


        episodes.push(
            {
                start:
                    history[
                        index
                    ],

                end:
                    end
            }
        );
    }


    return episodes;
}



// ==================================================
// ניבוי דימום
// ==================================================

function getBleedingPredictionSamples() {

    const history =
        getHistory();


    const episodes =
        getBleedingEpisodes();


    const samples =
        [];


    for (
        let index =
            0;

        index <
        history.length;

        index++
    ) {

        const removal =
            history[
                index
            ];


        if (
            removal.type !==
            "removal"
        ) {

            continue;
        }


        let nextInsertion =
            null;


        for (
            let next =
                index + 1;

            next <
            history.length;

            next++
        ) {

            if (
                history[
                    next
                ].type ===
                "insertion"
            ) {

                nextInsertion =
                    history[
                        next
                    ];

                break;
            }
        }


        if (
            !nextInsertion
        ) {

            continue;
        }


        const removalDate =
            new Date(
                removal.date
            );


        const insertionDate =
            new Date(
                nextInsertion.date
            );


        const breakHours =
            (
                insertionDate.getTime() -
                removalDate.getTime()
            ) /
            HOUR_MS;


        /*
         * חיבור ישיר בין טבעות
         * לא נכלל בלמידה.
         *
         * גם הפסקה ארוכה מ-7 ימים
         * לא משמשת כמדגם רגיל.
         */

        if (
            breakHours <
                24 ||

            breakHours >
                168
        ) {

            continue;
        }


        const searchEnd =
            addDays(
                removalDate,
                8
            );


        const episode =
            episodes.find(
                function (
                    item
                ) {

                    const start =
                        new Date(
                            item.start.date
                        );


                    return (
                        start >=
                            removalDate &&

                        start <=
                            searchEnd
                    );
                }
            );


        if (
            !episode
        ) {

            continue;
        }


        const start =
            new Date(
                episode.start.date
            );


        const delayDays =
            (
                start.getTime() -
                removalDate.getTime()
            ) /
            DAY_MS;


        let durationDays =
            null;


        if (
            episode.end
        ) {

            durationDays =
                (
                    new Date(
                        episode.end.date
                    ).getTime() -

                    start.getTime()
                ) /
                DAY_MS;
        }


        samples.push(
            {
                delayDays:
                    delayDays,

                durationDays:
                    durationDays
            }
        );
    }


    return samples.slice(
        -8
    );
}



function getPredictionReferenceRemoval() {

    const context =
        getCurrentCycleContext();


    if (
        !context
    ) {

        return null;
    }


    if (
        context.phase ===
        "break"
    ) {

        return new Date(
            context.removal.date
        );
    }


    return addDays(
        new Date(
            context.insertion.date
        ),
        21
    );
}



function getBleedingPrediction() {

    const samples =
        getBleedingPredictionSamples();


    if (
        samples.length <
        3
    ) {

        return null;
    }


    const referenceRemoval =
        getPredictionReferenceRemoval();


    if (
        !referenceRemoval
    ) {

        return null;
    }


    const context =
        getCurrentCycleContext();


    if (
        context &&
        context.phase ===
            "break"
    ) {

        const removalDate =
            new Date(
                context.removal.date
            );


        const actualStart =
            getHistory().find(
                function (
                    event
                ) {

                    return (
                        event.type ===
                            "bleedingStart" &&

                        new Date(
                            event.date
                        ) >=
                            removalDate
                    );
                }
            );


        if (
            actualStart
        ) {

            return null;
        }
    }


    const delay =
        median(
            samples.map(
                function (
                    sample
                ) {

                    return sample.delayDays;
                }
            )
        );


    const durationValues =
        samples
            .filter(
                function (
                    sample
                ) {

                    return (
                        sample.durationDays !==
                        null
                    );
                }
            )
            .map(
                function (
                    sample
                ) {

                    return sample.durationDays;
                }
            );


    const duration =
        median(
            durationValues
        );


    const predictedStart =
        new Date(
            referenceRemoval.getTime() +
            (
                delay *
                DAY_MS
            )
        );


    const predictedEnd =
        duration ===
            null
            ?
            null
            :
            new Date(
                predictedStart.getTime() +
                (
                    duration *
                    DAY_MS
                )
            );


    return {
        sampleCount:
            samples.length,

        predictedStart:
            predictedStart,

        predictedEnd:
            predictedEnd
    };
}



function formatPredictionRange(
    prediction
) {

    if (
        !prediction.predictedEnd
    ) {

        return formatFriendlyDate(
            prediction.predictedStart
        );
    }


    const start =
        prediction.predictedStart;


    const end =
        prediction.predictedEnd;


    if (
        start.getMonth() ===
            end.getMonth() &&

        start.getFullYear() ===
            end.getFullYear()
    ) {

        return (
            `${start.getDate()}–` +
            `${end.getDate()} ` +
            `${monthNameFormatter.format(
                start
            )}`
        );
    }


    return (
        `${formatFriendlyDate(
            start
        )} – ` +
        `${formatFriendlyDate(
            end
        )}`
    );
}



// ==================================================
// אזהרות רפואיות
// ==================================================

function getTemporaryOutDurationMinutes(
    event
) {

    if (
        !event.returnDate
    ) {

        return null;
    }


    return Math.round(
        (
            new Date(
                event.returnDate
            ).getTime() -

            new Date(
                event.date
            ).getTime()
        ) /
        60000
    );
}



function findActiveInsertionBefore(
    date
) {

    let active =
        null;


    for (
        const event
        of getHistory()
    ) {

        const eventDate =
            new Date(
                event.date
            );


        if (
            eventDate >
            date
        ) {

            break;
        }


        if (
            event.type ===
            "insertion"
        ) {

            active =
                event;
        }


        if (
            event.type ===
            "removal"
        ) {

            active =
                null;
        }
    }


    return active;
}



function getUseDay(
    insertionDate,
    eventDate
) {

    if (
        eventDate <
        insertionDate
    ) {

        return null;
    }


    return (
        calendarDayDifference(
            insertionDate,
            eventDate
        ) +
        1
    );
}



function getMedicalWarnings() {

    const history =
        getHistory();


    const warnings =
        [];



    /*
     * הטבעת הייתה בחוץ
     * יותר מ-3 שעות.
     */

    history.forEach(
        function (
            event
        ) {

            if (
                event.type !==
                "temporaryOut"
            ) {

                return;
            }


            const minutes =
                getTemporaryOutDurationMinutes(
                    event
                );


            if (
                minutes ===
                    null ||

                minutes <=
                    180
            ) {

                return;
            }


            const outDate =
                new Date(
                    event.date
                );


            const insertion =
                findActiveInsertionBefore(
                    outDate
                );


            const useDay =
                insertion
                    ?
                    getUseDay(
                        new Date(
                            insertion.date
                        ),
                        outDate
                    )
                    :
                    null;


            if (
                useDay !==
                    null &&

                useDay <=
                    14
            ) {

                warnings.push(
                    {
                        level:
                            "warning",

                        date:
                            event.date,

                        title:
                            "הטבעת הייתה בחוץ יותר מ־3 שעות",

                        message:
                            "האירוע התרחש בשבוע 1 או 2. לפי הוראות NuvaRing, ההגנה עשויה להיות מופחתת ונדרש אמצעי מניעה נוסף עד 7 ימים רצופים של שימוש בטבעת."
                    }
                );


                return;
            }


            if (
                useDay !==
                    null &&

                useDay <=
                    21
            ) {

                warnings.push(
                    {
                        level:
                            "important",

                        date:
                            event.date,

                        title:
                            "חריגה בשבוע 3",

                        message:
                            "הטבעת הייתה בחוץ יותר מ־3 שעות בשבוע השלישי. במצב זה קיימות הוראות מיוחדות לגבי החלפת הטבעת ותזמון ההפסקה."
                    }
                );


                return;
            }


            warnings.push(
                {
                    level:
                        "warning",

                    date:
                        event.date,

                    title:
                        "הטבעת הייתה בחוץ יותר מ־3 שעות",

                    message:
                        "לא ניתן לקבוע מההיסטוריה באיזה שבוע אירעה החריגה."
                }
            );
        }
    );



    /*
     * הפסקה של יותר מ-7 ימים.
     */

    for (
        let index =
            0;

        index <
        history.length;

        index++
    ) {

        if (
            history[
                index
            ].type !==
            "removal"
        ) {

            continue;
        }


        const removal =
            history[
                index
            ];


        const removalDate =
            new Date(
                removal.date
            );


        let nextInsertion =
            null;


        for (
            let next =
                index + 1;

            next <
            history.length;

            next++
        ) {

            if (
                history[
                    next
                ].type ===
                "insertion"
            ) {

                nextInsertion =
                    history[
                        next
                    ];

                break;
            }
        }


        if (
            nextInsertion
        ) {

            const hours =
                (
                    new Date(
                        nextInsertion.date
                    ).getTime() -

                    removalDate.getTime()
                ) /
                HOUR_MS;


            if (
                hours >
                168
            ) {

                warnings.push(
                    {
                        level:
                            "important",

                        date:
                            nextInsertion.date,

                        title:
                            "ההפסקה עברה 7 ימים",

                        message:
                            "ההפסקה ללא טבעת הייתה ארוכה משבוע. ההגנה עלולה להיות מופחתת."
                    }
                );
            }


            continue;
        }


        const hoursSinceRemoval =
            (
                Date.now() -
                removalDate.getTime()
            ) /
            HOUR_MS;


        if (
            hoursSinceRemoval >
            168
        ) {

            warnings.push(
                {
                    level:
                        "important",

                    date:
                        new Date()
                            .toISOString(),

                    title:
                        "שבוע ההפסקה כבר עבר",

                    message:
                        "עברו יותר מ־7 ימים מאז ההוצאה ולא נרשמה טבעת חדשה."
                }
            );
        }
    }



    /*
     * טבעת שנשארה מעבר לזמן.
     */

    const context =
        getCurrentCycleContext();


    if (
        context &&
        context.phase ===
            "ring"
    ) {

        const insertionDate =
            new Date(
                context.insertion.date
            );


        const wearDaysExact =
            (
                Date.now() -
                insertionDate.getTime()
            ) /
            DAY_MS;


        if (
            wearDaysExact >
            28
        ) {

            warnings.push(
                {
                    level:
                        "important",

                    date:
                        new Date()
                            .toISOString(),

                    title:
                        "הטבעת בפנים יותר מ־4 שבועות",

                    message:
                        "נרשמה אותה טבעת במשך יותר מ־4 שבועות. יש לפעול לפי הוראות NuvaRing בנוגע להתחלה מחדש."
                }
            );

        } else if (
            wearDaysExact >
            21
        ) {

            warnings.push(
                {
                    level:
                        "info",

                    date:
                        new Date()
                            .toISOString(),

                    title:
                        "עבר מועד ההוצאה הרגיל",

                    message:
                        "עברו יותר מ־21 ימים מאז הכנסת הטבעת."
                }
            );
        }
    }


    return warnings;
}



// ==================================================
// העיגול 21 + 7
// ==================================================

/*
 * מבנה העיגול:
 *
 * 0° = שעה 9
 *
 * 21 ימי טבעת:
 * 0° עד 268°
 *
 * רווח:
 * 268° עד 272°
 *
 * 7 ימי הפסקה:
 * 272° עד 358°
 *
 * רווח:
 * 358° עד 360°
 */



function ringDayAngle(
    dayOffset
) {

    const clamped =
        Math.max(
            0,
            Math.min(
                21,
                dayOffset
            )
        );


    return (
        clamped /
        21
    ) *
    268;
}



function breakDayAngle(
    dayOffset
) {

    const clamped =
        Math.max(
            0,
            Math.min(
                7,
                dayOffset
            )
        );


    return (
        272 +
        (
            clamped /
            7
        ) *
        86
    );
}



/*
 * angle = 0
 * יהיה בדיוק בשעה 9.
 *
 * ככל שהזווית גדלה
 * מתקדמים עם כיוון השעון.
 */

function setCircleAngle(
    element,
    visualAngle
) {

    const degrees =
        180 +
        visualAngle;


    const radians =
        degrees *
        Math.PI /
        180;


    const radius =
        46;


    const x =
        50 +
        radius *
        Math.cos(
            radians
        );


    const y =
        50 +
        radius *
        Math.sin(
            radians
        );


    element.style.left =
        `${x}%`;


    element.style.top =
        `${y}%`;
}



/*
 * הנקודה משתנה בחצות.
 *
 * יום 1:
 * offset = 0
 * שעה 9.
 *
 * יום 2:
 * offset = 1
 * צעד אחד עם כיוון השעון.
 */

function getCurrentScheduleAngle(
    context
) {

    if (
        !context
    ) {

        return null;
    }


    const today =
        new Date();


    if (
        context.phase ===
        "ring"
    ) {

        const insertionDate =
            new Date(
                context.insertion.date
            );


        const elapsedDays =
            calendarDayDifference(
                insertionDate,
                today
            );


        return ringDayAngle(
            elapsedDays
        );
    }


    const removalDate =
        new Date(
            context.removal.date
        );


    const breakDays =
        calendarDayDifference(
            removalDate,
            today
        );


    return breakDayAngle(
        breakDays
    );
}



/*
 * זה החלק שמצייר את הצבע
 * החזק מההתחלה ועד היום.
 *
 * אין כאן שכבת progress נפרדת.
 * ה-gradient של העיגול עצמו משתנה.
 */

function renderCycleTrack(
    context,
    currentAngle
) {

    if (
        !context ||
        currentAngle ===
            null
    ) {

        cycleRing.style.background =
            `
            conic-gradient(
                from -90deg,

                var(--ring-soft)
                0deg
                268deg,

                transparent
                268deg
                272deg,

                var(--break-soft)
                272deg
                358deg,

                transparent
                358deg
                360deg
            )
            `;


        return;
    }



    /*
     * 21 ימי הטבעת.
     */

    if (
        context.phase ===
        "ring"
    ) {

        const progress =
            Math.max(
                0,
                Math.min(
                    268,
                    currentAngle
                )
            );


        cycleRing.style.background =
            `
            conic-gradient(
                from -90deg,

                var(--ring-progress)
                0deg
                ${progress}deg,

                var(--ring-soft)
                ${progress}deg
                268deg,

                transparent
                268deg
                272deg,

                var(--break-soft)
                272deg
                358deg,

                transparent
                358deg
                360deg
            )
            `;


        return;
    }



    /*
     * בזמן ההפסקה:
     *
     * כל 21 ימי הטבעת כבר כהים,
     * ובאזור ההפסקה נצבעת
     * ההתקדמות בצבע נפרד.
     */

    const progress =
        Math.max(
            272,
            Math.min(
                358,
                currentAngle
            )
        );


    cycleRing.style.background =
        `
        conic-gradient(
            from -90deg,

            var(--ring-progress)
            0deg
            268deg,

            transparent
            268deg
            272deg,

            var(--break-progress)
            272deg
            ${progress}deg,

            var(--break-soft)
            ${progress}deg
            358deg,

            transparent
            358deg
            360deg
        )
        `;
}



// ==================================================
// חריגות ויזואליות על העיגול
// ==================================================

function getCircleAnomalies(
    context
) {

    if (
        !context ||
        !context.insertion
    ) {

        return [];
    }


    const history =
        getHistory();


    const insertionDate =
        new Date(
            context.insertion.date
        );


    const cycleEnd =
        context.removal
            ?
            new Date(
                context.removal.date
            )
            :
            new Date();


    const anomalies =
        [];



    /*
     * טבעת בחוץ יותר מ-3 שעות.
     */

    history.forEach(
        function (
            event
        ) {

            if (
                event.type !==
                "temporaryOut"
            ) {

                return;
            }


            const eventDate =
                new Date(
                    event.date
                );


            if (
                eventDate <
                    insertionDate ||

                eventDate >
                    cycleEnd
            ) {

                return;
            }


            const minutes =
                getTemporaryOutDurationMinutes(
                    event
                );


            if (
                minutes ===
                    null ||

                minutes <=
                    180
            ) {

                return;
            }


            const offset =
                calendarDayDifference(
                    insertionDate,
                    eventDate
                );


            const useDay =
                getUseDay(
                    insertionDate,
                    eventDate
                );


            anomalies.push(
                {
                    angle:
                        ringDayAngle(
                            offset
                        ),

                    level:
                        useDay !==
                            null &&
                        useDay >=
                            15
                            ?
                            "important"
                            :
                            "warning"
                }
            );
        }
    );



    /*
     * הוצאה מוקדמת / מאוחרת
     * ביותר מ-12 שעות.
     */

    if (
        context.removal
    ) {

        const removalDate =
            new Date(
                context.removal.date
            );


        const plannedRemoval =
            addDays(
                insertionDate,
                21
            );


        const deviationHours =
            Math.abs(
                removalDate.getTime() -
                plannedRemoval.getTime()
            ) /
            HOUR_MS;


        if (
            deviationHours >=
            12
        ) {

            anomalies.push(
                {
                    angle:
                        ringDayAngle(
                            calendarDayDifference(
                                insertionDate,
                                removalDate
                            )
                        ),

                    level:
                        "deviation"
                }
            );
        }
    }



    /*
     * עבר מועד ההוצאה.
     */

    if (
        context.phase ===
        "ring"
    ) {

        const plannedRemoval =
            addDays(
                insertionDate,
                21
            );


        const overdueMs =
            Date.now() -
            plannedRemoval.getTime();


        if (
            overdueMs >
            0
        ) {

            anomalies.push(
                {
                    angle:
                        268,

                    level:
                        overdueMs >
                            7 *
                            DAY_MS
                            ?
                            "important"
                            :
                            "warning"
                }
            );
        }
    }



    /*
     * עברו יותר מ-7 ימים
     * מאז ההוצאה.
     */

    if (
        context.phase ===
        "break"
    ) {

        const plannedInsertion =
            addDays(
                new Date(
                    context.removal.date
                ),
                7
            );


        if (
            Date.now() >
            plannedInsertion.getTime()
        ) {

            anomalies.push(
                {
                    angle:
                        358,

                    level:
                        "important"
                }
            );
        }
    }


    return anomalies.slice(
        -3
    );
}



// ==================================================
// ציור מסך הבית
// ==================================================

function renderCycleVisual() {

    const context =
        getCurrentCycleContext();


    cycleMarkers.innerHTML =
        "";


    cycleRingShell.classList.remove(
        "attention",
        "important"
    );



    if (
        !context ||
        !context.insertion
    ) {

        cycleStatus.textContent =
            "אין מחזור פעיל";


        cycleDayNumber.textContent =
            "—";


        cycleDayLabel.textContent =
            "—";


        cycleCountdown.textContent =
            "הכניסי טבעת כדי להתחיל";


        cycleCurrentMarker.hidden =
            true;


        renderCycleTrack(
            null,
            null
        );


        return;
    }



    const currentAngle =
        getCurrentScheduleAngle(
            context
        );


    renderCycleTrack(
        context,
        currentAngle
    );


    cycleCurrentMarker.hidden =
        false;


    setCircleAngle(
        cycleCurrentMarker,
        currentAngle
    );



    // ------------------------------------------
    // טבעת בפנים
    // ------------------------------------------

    if (
        context.phase ===
        "ring"
    ) {

        const insertionDate =
            new Date(
                context.insertion.date
            );


        const elapsedDays =
            calendarDayDifference(
                insertionDate,
                new Date()
            );


        const displayedDay =
            Math.max(
                1,
                Math.min(
                    21,
                    elapsedDays +
                    1
                )
            );


        const plannedRemoval =
            addDays(
                insertionDate,
                21
            );


        const daysUntil =
            calendarDayDifference(
                new Date(),
                plannedRemoval
            );


        cycleStatus.textContent =
            "טבעת בפנים";


        cycleDayNumber.textContent =
            String(
                displayedDay
            );


        cycleDayLabel.textContent =
            "יום מתוך 21";



        if (
            daysUntil >
            1
        ) {

            cycleCountdown.textContent =
                `עוד ${daysUntil} ימים להוצאה`;

        } else if (
            daysUntil ===
            1
        ) {

            cycleCountdown.textContent =
                "ההוצאה מתוכננת למחר";

        } else if (
            daysUntil ===
            0
        ) {

            cycleCountdown.textContent =
                "היום מועד ההוצאה המתוכנן";

        } else {

            const overdue =
                Math.abs(
                    daysUntil
                );


            cycleCountdown.textContent =
                overdue ===
                    1
                    ?
                    "עבר יום ממועד ההוצאה"
                    :
                    `עברו ${overdue} ימים ממועד ההוצאה`;
        }

    } else {


        // ------------------------------------------
        // הפסקה
        // ------------------------------------------

        const removalDate =
            new Date(
                context.removal.date
            );


        const elapsedDays =
            calendarDayDifference(
                removalDate,
                new Date()
            );


        const displayedDay =
            Math.max(
                1,
                Math.min(
                    7,
                    elapsedDays +
                    1
                )
            );


        const plannedInsertion =
            addDays(
                removalDate,
                7
            );


        const daysUntil =
            calendarDayDifference(
                new Date(),
                plannedInsertion
            );


        cycleStatus.textContent =
            "הפסקה";


        cycleDayNumber.textContent =
            String(
                displayedDay
            );


        cycleDayLabel.textContent =
            "יום מתוך 7";



        if (
            daysUntil >
            1
        ) {

            cycleCountdown.textContent =
                `עוד ${daysUntil} ימים לטבעת חדשה`;

        } else if (
            daysUntil ===
            1
        ) {

            cycleCountdown.textContent =
                "הטבעת החדשה מתוכננת למחר";

        } else if (
            daysUntil ===
            0
        ) {

            cycleCountdown.textContent =
                "היום מועד הכנסת הטבעת";

        } else {

            const overdue =
                Math.abs(
                    daysUntil
                );


            cycleCountdown.textContent =
                overdue ===
                    1
                    ?
                    "עבר יום ממועד הכנסת הטבעת"
                    :
                    `עברו ${overdue} ימים ממועד הכנסת הטבעת`;
        }
    }



    /*
     * סימוני חריגות.
     */

    getCircleAnomalies(
        context
    ).forEach(
        function (
            anomaly
        ) {

            const marker =
                document.createElement(
                    "span"
                );


            marker.className =
                `cycle-anomaly-marker ${anomaly.level}`;


            setCircleAngle(
                marker,
                anomaly.angle
            );


            cycleMarkers.appendChild(
                marker
            );
        }
    );



    /*
     * הילה סביב העיגול
     * כאשר קיימת אזהרה פעילה.
     */

    const warnings =
        getMedicalWarnings();


    if (
        warnings.some(
            function (
                warning
            ) {

                return (
                    warning.level ===
                    "important"
                );
            }
        )
    ) {

        cycleRingShell.classList.add(
            "important"
        );

    } else if (
        warnings.some(
            function (
                warning
            ) {

                return (
                    warning.level ===
                    "warning"
                );
            }
        )
    ) {

        cycleRingShell.classList.add(
            "attention"
        );
    }
}



// ==================================================
// מידע מהיר
// ==================================================

function renderInsights() {

    const last =
        getLastRingEvent();



    if (
        !last
    ) {

        nextActionName.textContent =
            "הכנסת טבעת";


        nextActionDate.textContent =
            "לא נקבע תאריך";

    } else if (
        last.type ===
        "insertion"
    ) {

        nextActionName.textContent =
            "הוצאת טבעת";


        nextActionDate.textContent =
            formatFriendlyDate(
                addDays(
                    new Date(
                        last.date
                    ),
                    21
                )
            );

    } else {

        nextActionName.textContent =
            "טבעת חדשה";


        nextActionDate.textContent =
            formatFriendlyDate(
                addDays(
                    new Date(
                        last.date
                    ),
                    7
                )
            );
    }



    const prediction =
        getBleedingPrediction();



    if (
        !prediction
    ) {

        bleedingPredictionCard.hidden =
            true;


        insightsGrid.classList.add(
            "single"
        );

    } else {

        bleedingPredictionCard.hidden =
            false;


        insightsGrid.classList.remove(
            "single"
        );


        bleedingPredictionDate.textContent =
            formatPredictionRange(
                prediction
            );


        bleedingPredictionBasis.textContent =
            prediction.sampleCount >=
                5
                ?
                `לפי ${prediction.sampleCount} הפסקות קודמות`
                :
                "תחזית ראשונית";
    }



    const samples =
        getBleedingPredictionSamples();



    if (
        samples.length <
        3
    ) {

        predictionSettingsSummary.textContent =
            `נדרשות לפחות 3 הפסקות עם דימום מתועד. כרגע קיימות ${samples.length}.`;

    } else {

        predictionSettingsSummary.textContent =
            `התחזית מבוססת על ${samples.length} הפסקות קודמות ומשתמשת בחציון כדי לצמצם השפעה של מחזור חריג.`;
    }
}



// ==================================================
// הצגת אזהרות
// ==================================================

function renderMedicalWarnings() {

    const now =
        new Date();


    const visible =
        getMedicalWarnings().filter(
            function (
                warning
            ) {

                const days =
                    Math.abs(
                        now.getTime() -
                        new Date(
                            warning.date
                        ).getTime()
                    ) /
                    DAY_MS;


                return (
                    days <=
                        14 ||

                    warning.level ===
                        "important"
                );
            }
        );


    medicalAlertsList.innerHTML =
        "";


    medicalAlertsCard.hidden =
        visible.length ===
        0;


    visible.forEach(
        function (
            warning
        ) {

            const item =
                document.createElement(
                    "details"
                );


            item.className =
                `medical-alert ${warning.level}`;


            item.innerHTML =
                `
                <summary>

                    <div>

                        <div class="medical-alert-title">
                            ${warning.title}
                        </div>

                        <div class="medical-alert-link">
                            הצגת הנחיות
                        </div>

                    </div>

                    <span>
                        ‹
                    </span>

                </summary>

                <div class="medical-alert-body">
                    ${warning.message}
                </div>
                `;


            medicalAlertsList.appendChild(
                item
            );
        }
    );
}



// ==================================================
// לוח שנה
// ==================================================

function getPlannedDates() {

    const last =
        getLastRingEvent();


    if (
        !last
    ) {

        return {
            removal:
                null,

            insertion:
                null
        };
    }


    if (
        last.type ===
        "insertion"
    ) {

        const removal =
            addDays(
                new Date(
                    last.date
                ),
                21
            );


        return {
            removal:
                removal,

            insertion:
                addDays(
                    removal,
                    7
                )
        };
    }


    return {
        removal:
            null,

        insertion:
            addDays(
                new Date(
                    last.date
                ),
                7
            )
    };
}



function getCalendarEvents(
    date
) {

    return getHistory().filter(
        function (
            event
        ) {

            return isSameDay(
                new Date(
                    event.date
                ),
                date
            );
        }
    );
}



function getCalendarState(
    date
) {

    const history =
        getHistory();


    const dayEnd =
        endOfDay(
            date
        );


    let ringState =
        null;


    let bleeding =
        false;


    let insertion =
        false;


    let removal =
        false;



    history.forEach(
        function (
            event
        ) {

            const eventDate =
                new Date(
                    event.date
                );


            if (
                eventDate >
                dayEnd
            ) {

                return;
            }


            if (
                event.type ===
                "insertion"
            ) {

                ringState =
                    "in";
            }


            if (
                event.type ===
                "removal"
            ) {

                ringState =
                    "out";
            }


            if (
                isSameDay(
                    eventDate,
                    date
                )
            ) {

                if (
                    event.type ===
                    "insertion"
                ) {

                    insertion =
                        true;
                }


                if (
                    event.type ===
                    "removal"
                ) {

                    removal =
                        true;
                }
            }
        }
    );



    history.forEach(
        function (
            event
        ) {

            const eventDate =
                new Date(
                    event.date
                );


            if (
                eventDate >
                dayEnd
            ) {

                return;
            }


            if (
                event.type ===
                "bleedingStart"
            ) {

                bleeding =
                    true;
            }


            if (
                event.type ===
                "bleedingEnd"
            ) {

                bleeding =
                    false;
            }
        }
    );


    if (
        date >
        new Date()
    ) {

        bleeding =
            false;
    }



    const planned =
        getPlannedDates();


    const plannedRemoval =
        Boolean(
            planned.removal &&
            isSameDay(
                date,
                planned.removal
            )
        );


    const plannedInsertion =
        Boolean(
            planned.insertion &&
            isSameDay(
                date,
                planned.insertion
            )
        );


    const last =
        getLastRingEvent();



    /*
     * השלמת התכנון קדימה
     * עבור המחזור הפעיל.
     */

    if (
        last &&
        last.type ===
            "insertion" &&

        planned.removal &&
        planned.insertion
    ) {

        if (
            date >=
                startOfDay(
                    planned.removal
                ) &&

            date <
                startOfDay(
                    planned.insertion
                )
        ) {

            ringState =
                "out";
        }


        if (
            date >=
            startOfDay(
                planned.insertion
            )
        ) {

            ringState =
                null;
        }
    }



    if (
        last &&
        last.type ===
            "removal" &&

        planned.insertion &&

        date >=
            startOfDay(
                planned.insertion
            )
    ) {

        ringState =
            null;
    }



    const warning =
        getMedicalWarnings().some(
            function (
                item
            ) {

                return isSameDay(
                    date,
                    new Date(
                        item.date
                    )
                );
            }
        );



    const prediction =
        getBleedingPrediction();


    let predictedBleeding =
        false;



    if (
        prediction
    ) {

        const predictionEnd =
            prediction.predictedEnd ||
            prediction.predictedStart;


        predictedBleeding =
            (
                startOfDay(
                    date
                ) >=
                    startOfDay(
                        prediction.predictedStart
                    ) &&

                startOfDay(
                    date
                ) <=
                    startOfDay(
                        predictionEnd
                    )
            );
    }



    return {
        ringState:
            ringState,

        bleeding:
            bleeding,

        insertion:
            insertion,

        removal:
            removal,

        plannedRemoval:
            plannedRemoval,

        plannedInsertion:
            plannedInsertion,

        warning:
            warning,

        predictedBleeding:
            predictedBleeding
    };
}



function renderCalendar() {

    const year =
        calendarViewDate.getFullYear();


    const month =
        calendarViewDate.getMonth();


    calendarMonthTitle.textContent =
        monthFormatter.format(
            calendarViewDate
        );


    calendarGrid.innerHTML =
        "";


    const firstWeekday =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();



    for (
        let index =
            0;

        index <
        firstWeekday;

        index++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "calendar-day empty";


        calendarGrid.appendChild(
            empty
        );
    }



    const today =
        new Date();



    for (
        let day =
            1;

        day <=
        daysInMonth;

        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const state =
            getCalendarState(
                date
            );


        const element =
            document.createElement(
                "div"
            );


        element.className =
            "calendar-day";


        if (
            state.ringState ===
            "in"
        ) {

            element.classList.add(
                "ring-day"
            );
        }


        if (
            state.ringState ===
            "out"
        ) {

            element.classList.add(
                "break-day"
            );
        }


        if (
            isSameDay(
                date,
                today
            )
        ) {

            element.classList.add(
                "today"
            );
        }



        let markers =
            "";


        if (
            state.insertion
        ) {

            markers +=
                `<span class="calendar-marker">●</span>`;
        }


        if (
            state.removal
        ) {

            markers +=
                `<span class="calendar-marker">○</span>`;
        }


        if (
            state.plannedRemoval &&
            !state.removal
        ) {

            markers +=
                `<span class="calendar-marker">↓</span>`;
        }


        if (
            state.plannedInsertion &&
            !state.insertion
        ) {

            markers +=
                `<span class="calendar-marker">↑</span>`;
        }


        if (
            state.bleeding
        ) {

            markers +=
                `<span class="calendar-marker bleeding"></span>`;
        }


        if (
            state.predictedBleeding &&
            !state.bleeding
        ) {

            markers +=
                `<span class="calendar-marker predicted-bleeding"></span>`;
        }


        if (
            state.warning
        ) {

            markers +=
                `<span class="calendar-marker warning">!</span>`;
        }



        element.innerHTML =
            `
            <span class="calendar-day-number">
                ${day}
            </span>

            <div class="calendar-markers">
                ${markers}
            </div>
            `;



        element.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".calendar-day.selected"
                    )
                    .forEach(
                        function (
                            selected
                        ) {

                            selected.classList.remove(
                                "selected"
                            );
                        }
                    );


                element.classList.add(
                    "selected"
                );


                showCalendarDay(
                    date
                );
            }
        );


        calendarGrid.appendChild(
            element
        );
    }
}



function showCalendarDay(
    date
) {

    const state =
        getCalendarState(
            date
        );


    calendarSelectedDate.textContent =
        fullDateFormatter.format(
            date
        );



    let ringText =
        "אין מידע";


    if (
        state.ringState ===
        "in"
    ) {

        ringText =
            "טבעת בפנים";
    }


    if (
        state.ringState ===
        "out"
    ) {

        ringText =
            "הפסקה";
    }



    let bleedingText =
        "—";


    if (
        state.bleeding
    ) {

        bleedingText =
            "פעיל";

    } else if (
        state.predictedBleeding
    ) {

        bleedingText =
            "צפוי";
    }



    let plannedText =
        "—";


    if (
        state.plannedRemoval
    ) {

        plannedText =
            "הוצאה מתוכננת";
    }


    if (
        state.plannedInsertion
    ) {

        plannedText =
            "הכנסה מתוכננת";
    }



    calendarDaySummary.innerHTML =
        `
        <div class="calendar-summary-row">
            <span>טבעת</span>
            <strong>${ringText}</strong>
        </div>

        <div class="calendar-summary-row">
            <span>דימום</span>
            <strong>${bleedingText}</strong>
        </div>

        <div class="calendar-summary-row">
            <span>מתוכנן</span>
            <strong>${plannedText}</strong>
        </div>
        `;



    calendarSelectedEvents.innerHTML =
        "";



    const warnings =
        getMedicalWarnings().filter(
            function (
                warning
            ) {

                return isSameDay(
                    date,
                    new Date(
                        warning.date
                    )
                );
            }
        );



    warnings.forEach(
        function (
            warning
        ) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                `medical-alert ${warning.level}`;


            item.innerHTML =
                `
                <div class="medical-alert-body">

                    <strong>
                        ${warning.title}
                    </strong>

                    <br>

                    ${warning.message}

                </div>
                `;


            calendarSelectedEvents.appendChild(
                item
            );
        }
    );



    const events =
        getCalendarEvents(
            date
        );



    events.forEach(
        function (
            event
        ) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "calendar-event-item";


            let extra =
                "";


            if (
                event.type ===
                    "temporaryOut" &&

                event.returnDate
            ) {

                extra =
                    `
                    <div>
                        הוחזרה:
                        ${formatDateTime(
                            new Date(
                                event.returnDate
                            )
                        )}
                    </div>
                    `;
            }


            item.innerHTML =
                `
                <strong>
                    ${getEventName(
                        event
                    )}
                </strong>

                <div>
                    ${formatDateTime(
                        new Date(
                            event.date
                        )
                    )}
                </div>

                ${extra}
                `;


            calendarSelectedEvents.appendChild(
                item
            );
        }
    );



    if (
        events.length ===
            0 &&

        warnings.length ===
            0
    ) {

        calendarSelectedEvents.innerHTML =
            `
            <p class="empty-message">
                אין אירועים שנרשמו ביום הזה.
            </p>
            `;
    }
}



// ==================================================
// היסטוריה
// ==================================================

function getEventName(
    event
) {

    const names = {
        insertion:
            "💍 הכנסת טבעת",

        removal:
            "○ הוצאת טבעת",

        bleedingStart:
            "🩸 תחילת דימום",

        bleedingEnd:
            "✓ סיום דימום",

        temporaryOut:
            "↔ הטבעת הייתה בחוץ זמנית"
    };


    return (
        names[
            event.type
        ] ||
        "אירוע"
    );
}



function buildCycles() {

    const cycles =
        [];


    let current =
        null;



    getHistory().forEach(
        function (
            event
        ) {

            if (
                event.type ===
                "insertion"
            ) {

                if (
                    current
                ) {

                    cycles.push(
                        current
                    );
                }


                current = {
                    insertion:
                        event,

                    events:
                        [
                            event
                        ]
                };


                return;
            }


            if (
                current
            ) {

                current.events.push(
                    event
                );
            }
        }
    );


    if (
        current
    ) {

        cycles.push(
            current
        );
    }


    return cycles;
}



function renderHistory() {

    const cycles =
        buildCycles();


    historyList.innerHTML =
        "";



    if (
        cycles.length ===
        0
    ) {

        historyList.innerHTML =
            `
            <p class="empty-message">
                עדיין אין מחזורים
            </p>
            `;


        return;
    }



    [...cycles]
        .reverse()
        .forEach(
            function (
                cycle,
                reverseIndex
            ) {

                const number =
                    cycles.length -
                    reverseIndex;


                const insertionDate =
                    new Date(
                        cycle.insertion.date
                    );


                const removal =
                    cycle.events.find(
                        function (
                            event
                        ) {

                            return (
                                event.type ===
                                "removal"
                            );
                        }
                    );


                const removalDate =
                    removal
                        ?
                        new Date(
                            removal.date
                        )
                        :
                        null;


                const card =
                    document.createElement(
                        "details"
                    );


                card.className =
                    "cycle-card";


                card.innerHTML =
                    `
                    <summary>

                        <div class="cycle-summary-main">

                            <span>
                                מחזור ${number}
                            </span>

                            <span>
                                ${
                                    removalDate
                                        ?
                                        "הסתיים"
                                        :
                                        "פעיל"
                                }
                            </span>

                        </div>

                        <div class="cycle-summary-date">

                            ${formatShortDate(
                                insertionDate
                            )}

                            ${
                                removalDate
                                    ?
                                    ` – ${formatShortDate(
                                        removalDate
                                    )}`
                                    :
                                    " – עכשיו"
                            }

                        </div>

                    </summary>

                    <div class="cycle-events">
                    </div>
                    `;


                const content =
                    card.querySelector(
                        ".cycle-events"
                    );



                cycle.events.forEach(
                    function (
                        event
                    ) {

                        const item =
                            document.createElement(
                                "div"
                            );


                        item.className =
                            "history-event";


                        let extra =
                            "";


                        if (
                            event.returnDate
                        ) {

                            extra +=
                                `
                                <div>
                                    הוחזרה:
                                    ${formatDateTime(
                                        new Date(
                                            event.returnDate
                                        )
                                    )}
                                </div>
                                `;
                        }


                        if (
                            event.timingStatus
                        ) {

                            extra +=
                                `
                                <div>
                                    ${event.timingStatus}
                                </div>
                                `;
                        }


                        if (
                            event.bleedingDuration
                        ) {

                            extra +=
                                `
                                <div>
                                    משך:
                                    ${event.bleedingDuration}
                                </div>
                                `;
                        }



                        item.innerHTML =
                            `
                            <strong>
                                ${getEventName(
                                    event
                                )}
                            </strong>

                            <div>
                                ${formatDateTime(
                                    new Date(
                                        event.date
                                    )
                                )}
                            </div>

                            ${extra}

                            <div class="history-actions">

                                <button
                                    class="history-action-button edit-event"
                                    data-id="${event.id}"
                                >
                                    עריכה
                                </button>

                                <button
                                    class="history-action-button delete delete-event"
                                    data-id="${event.id}"
                                >
                                    מחיקה
                                </button>

                            </div>
                            `;


                        content.appendChild(
                            item
                        );
                    }
                );


                historyList.appendChild(
                    card
                );
            }
        );



    document
        .querySelectorAll(
            ".edit-event"
        )
        .forEach(
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    function () {

                        editEvent(
                            Number(
                                button.dataset.id
                            )
                        );
                    }
                );
            }
        );



    document
        .querySelectorAll(
            ".delete-event"
        )
        .forEach(
            function (
                button
            ) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteEvent(
                            Number(
                                button.dataset.id
                            )
                        );
                    }
                );
            }
        );
}



// ==================================================
// עריכה ומחיקה
// ==================================================

function deleteEvent(
    id
) {

    if (
        !confirm(
            "למחוק את האירוע הזה?"
        )
    ) {

        return;
    }


    const history =
        getHistory().filter(
            function (
                event
            ) {

                return (
                    event.id !==
                    id
                );
            }
        );


    saveHistory(
        history
    );


    refreshApp();
}



function editEvent(
    id
) {

    const history =
        getHistory();


    const event =
        history.find(
            function (
                item
            ) {

                return (
                    item.id ===
                    id
                );
            }
        );


    if (
        !event
    ) {

        return;
    }



    const value =
        prompt(
            "תאריך ושעת האירוע:",
            formatInputDate(
                new Date(
                    event.date
                )
            )
        );


    if (
        !value
    ) {

        return;
    }



    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        alert(
            "התאריך אינו תקין."
        );


        return;
    }



    if (
        event.type ===
        "temporaryOut"
    ) {

        const returnValue =
            prompt(
                "תאריך ושעת ההחזרה:",
                formatInputDate(
                    new Date(
                        event.returnDate
                    )
                )
            );


        if (
            !returnValue
        ) {

            return;
        }


        const returnDate =
            new Date(
                returnValue
            );


        if (
            Number.isNaN(
                returnDate.getTime()
            ) ||

            returnDate <=
                date
        ) {

            alert(
                "זמן ההחזרה חייב להיות אחרי זמן היציאה."
            );


            return;
        }


        event.returnDate =
            returnDate.toISOString();
    }



    event.date =
        date.toISOString();


    saveHistory(
        history
    );


    refreshApp();
}



// ==================================================
// חלונית תחתונה
// ==================================================

function resetRingSheetViews() {

    ringDefaultActions.hidden =
        false;


    afterRemovalOptions.hidden =
        true;


    temporaryOutForm.hidden =
        true;


    ringCustomTime.open =
        false;


    ringActionDatetime.value =
        "";


    pendingRemovalDate =
        null;
}



function openSheet(
    type
) {

    resetRingSheetViews();


    ringSheet.hidden =
        type !==
        "ring";


    bleedingSheet.hidden =
        type !==
        "bleeding";


    sheetTitle.textContent =
        type ===
            "ring"
            ?
            "טבעת"
            :
            "דימום";


    if (
        type ===
        "ring"
    ) {

        updateRingSheetButtons();

    } else {

        updateBleedingSheetButtons();
    }


    sheetBackdrop.hidden =
        false;


    document.body.style.overflow =
        "hidden";
}



function closeSheet() {

    sheetBackdrop.hidden =
        true;


    document.body.style.overflow =
        "";


    bleedingCustomTime.open =
        false;


    bleedingActionDatetime.value =
        "";


    resetRingSheetViews();
}



function getRingActionDate() {

    if (
        ringCustomTime.open &&
        ringActionDatetime.value
    ) {

        const selected =
            new Date(
                ringActionDatetime.value
            );


        if (
            !Number.isNaN(
                selected.getTime()
            )
        ) {

            return selected;
        }
    }


    return new Date();
}



function getBleedingActionDate() {

    if (
        bleedingCustomTime.open &&
        bleedingActionDatetime.value
    ) {

        const selected =
            new Date(
                bleedingActionDatetime.value
            );


        if (
            !Number.isNaN(
                selected.getTime()
            )
        ) {

            return selected;
        }
    }


    return new Date();
}



function updateRingSheetButtons() {

    const last =
        getLastRingEvent();


    const ringInside =
        Boolean(
            last &&
            last.type ===
            "insertion"
        );


    sheetInsertButton.hidden =
        ringInside;


    sheetRemoveButton.hidden =
        !ringInside;


    sheetTemporaryOutButton.hidden =
        !ringInside;
}



function updateBleedingSheetButtons() {

    const active =
        getActiveBleedingStart();


    sheetBleedingStartButton.hidden =
        Boolean(
            active
        );


    sheetBleedingEndButton.hidden =
        !active;



    if (
        active
    ) {

        const days =
            Math.max(
                1,
                calendarDayDifference(
                    new Date(
                        active.date
                    ),
                    new Date()
                ) +
                1
            );


        bleedingSheetStatus.textContent =
            `דימום פעיל · יום ${days}`;

    } else {

        bleedingSheetStatus.textContent =
            "אין דימום פעיל";
    }
}



// ==================================================
// ניווט
// ==================================================

function openTab(
    name
) {

    document
        .querySelectorAll(
            ".tab-content"
        )
        .forEach(
            function (
                tab
            ) {

                tab.classList.remove(
                    "active"
                );
            }
        );


    document
        .querySelectorAll(
            ".bottom-nav-button"
        )
        .forEach(
            function (
                button
            ) {

                button.classList.remove(
                    "active"
                );
            }
        );


    const tab =
        $(
            `tab-${name}`
        );


    if (
        tab
    ) {

        tab.classList.add(
            "active"
        );
    }


    const navButton =
        document.querySelector(
            `.bottom-nav-button[data-tab="${name}"]`
        );


    if (
        navButton
    ) {

        navButton.classList.add(
            "active"
        );
    }


    bottomNav.hidden =
        name ===
        "settings";


    window.scrollTo(
        0,
        0
    );
}



// ==================================================
// גיבוי
// ==================================================

function exportData() {

    const backup = {
        app:
            "Ring Tracker",

        version:
            3,

        exportedAt:
            new Date()
                .toISOString(),

        history:
            getHistory()
    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `ring-tracker-backup-${Date.now()}.json`;


    link.click();


    URL.revokeObjectURL(
        url
    );
}



function importData(
    file
) {

    const reader =
        new FileReader();


    reader.onload =
        function (
            event
        ) {

            const fileContent =
                event.target
                    ?
                    event.target.result
                    :
                    null;


            /*
             * FileReader.result
             * יכול להיות string או ArrayBuffer.
             *
             * JSON.parse דורש string.
             */

            if (
                typeof fileContent !==
                "string"
            ) {

                alert(
                    "לא ניתן לקרוא את קובץ הגיבוי."
                );


                return;
            }



            let backup;


            try {

                backup =
                    JSON.parse(
                        fileContent
                    );

            } catch (
                error
            ) {

                console.error(
                    "Backup parsing error:",
                    error
                );


                alert(
                    "קובץ הגיבוי אינו תקין."
                );


                return;
            }



            if (
                !backup ||
                !Array.isArray(
                    backup.history
                )
            ) {

                alert(
                    "קובץ הגיבוי אינו תקין."
                );


                return;
            }



            if (
                !confirm(
                    "הייבוא יחליף את הנתונים הקיימים. להמשיך?"
                )
            ) {

                return;
            }


            saveHistory(
                backup.history
            );


            refreshApp();


            alert(
                "הגיבוי יובא בהצלחה."
            );
        };


    reader.readAsText(
        file
    );
}



// ==================================================
// מאזיני אירועים
// ==================================================

openRingActionsButton.addEventListener(
    "click",
    function () {

        openSheet(
            "ring"
        );
    }
);



openBleedingActionsButton.addEventListener(
    "click",
    function () {

        openSheet(
            "bleeding"
        );
    }
);



closeSheetButton.addEventListener(
    "click",
    closeSheet
);



sheetBackdrop.addEventListener(
    "click",
    function (
        event
    ) {

        if (
            event.target ===
            sheetBackdrop
        ) {

            closeSheet();
        }
    }
);



document.addEventListener(
    "keydown",
    function (
        event
    ) {

        if (
            event.key ===
                "Escape" &&

            !sheetBackdrop.hidden
        ) {

            closeSheet();
        }
    }
);



// ==================================================
// הכנסת טבעת
// ==================================================

sheetInsertButton.addEventListener(
    "click",
    function () {

        const date =
            getRingActionDate();


        if (
            !confirm(
                `לשמור הכנסת טבעת ב־${formatDateTime(
                    date
                )}?`
            )
        ) {

            return;
        }


        saveEvent(
            "insertion",
            date
        );


        closeSheet();


        refreshApp();
    }
);



// ==================================================
// הוצאת טבעת
// ==================================================

sheetRemoveButton.addEventListener(
    "click",
    function () {

        pendingRemovalDate =
            getRingActionDate();


        ringDefaultActions.hidden =
            true;


        afterRemovalOptions.hidden =
            false;
    }
);



startBreakButton.addEventListener(
    "click",
    function () {

        if (
            !pendingRemovalDate
        ) {

            return;
        }


        saveEvent(
            "removal",
            pendingRemovalDate
        );


        closeSheet();


        refreshApp();
    }
);



immediateReplacementButton.addEventListener(
    "click",
    function () {

        if (
            !pendingRemovalDate
        ) {

            return;
        }


        saveEvent(
            "removal",
            pendingRemovalDate
        );


        /*
         * שומרים הכנסת טבעת חדשה
         * שנייה אחת אחרי ההוצאה,
         * כדי שסדר האירועים יהיה חד-משמעי.
         */

        const insertionDate =
            new Date(
                pendingRemovalDate.getTime() +
                1000
            );


        saveEvent(
            "insertion",
            insertionDate
        );


        closeSheet();


        refreshApp();
    }
);



cancelRemovalButton.addEventListener(
    "click",
    function () {

        pendingRemovalDate =
            null;


        afterRemovalOptions.hidden =
            true;


        ringDefaultActions.hidden =
            false;
    }
);



// ==================================================
// הטבעת הייתה בחוץ זמנית
// ==================================================

sheetTemporaryOutButton.addEventListener(
    "click",
    function () {

        const now =
            new Date();


        const oneHourLater =
            new Date(
                now.getTime() +
                HOUR_MS
            );


        temporaryOutStart.value =
            formatInputDate(
                now
            );


        temporaryOutEnd.value =
            formatInputDate(
                oneHourLater
            );


        ringDefaultActions.hidden =
            true;


        temporaryOutForm.hidden =
            false;
    }
);



cancelTemporaryOutButton.addEventListener(
    "click",
    function () {

        temporaryOutForm.hidden =
            true;


        ringDefaultActions.hidden =
            false;
    }
);



saveTemporaryOutButton.addEventListener(
    "click",
    function () {

        const outDate =
            new Date(
                temporaryOutStart.value
            );


        const returnDate =
            new Date(
                temporaryOutEnd.value
            );


        if (
            Number.isNaN(
                outDate.getTime()
            ) ||

            Number.isNaN(
                returnDate.getTime()
            )
        ) {

            alert(
                "יש להזין תאריך ושעה תקינים."
            );


            return;
        }


        if (
            returnDate <=
            outDate
        ) {

            alert(
                "זמן ההחזרה חייב להיות אחרי זמן היציאה."
            );


            return;
        }


        saveTemporaryOut(
            outDate,
            returnDate
        );


        closeSheet();


        refreshApp();
    }
);



// ==================================================
// דימום
// ==================================================

sheetBleedingStartButton.addEventListener(
    "click",
    function () {

        const date =
            getBleedingActionDate();


        if (
            !confirm(
                `לשמור תחילת דימום ב־${formatDateTime(
                    date
                )}?`
            )
        ) {

            return;
        }


        saveEvent(
            "bleedingStart",
            date
        );


        closeSheet();


        refreshApp();
    }
);



sheetBleedingEndButton.addEventListener(
    "click",
    function () {

        const date =
            getBleedingActionDate();


        if (
            !confirm(
                `לשמור סיום דימום ב־${formatDateTime(
                    date
                )}?`
            )
        ) {

            return;
        }


        saveEvent(
            "bleedingEnd",
            date
        );


        closeSheet();


        refreshApp();
    }
);



// ==================================================
// ניווט תחתון
// ==================================================

document
    .querySelectorAll(
        ".bottom-nav-button"
    )
    .forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                function () {

                    openTab(
                        button.dataset.tab
                    );
                }
            );
        }
    );



settingsButton.addEventListener(
    "click",
    function () {

        openTab(
            "settings"
        );
    }
);



settingsBackButton.addEventListener(
    "click",
    function () {

        openTab(
            "today"
        );
    }
);



// ==================================================
// לוח שנה
// ==================================================

calendarPrevButton.addEventListener(
    "click",
    function () {

        calendarViewDate.setMonth(
            calendarViewDate.getMonth() -
            1
        );


        renderCalendar();
    }
);



calendarNextButton.addEventListener(
    "click",
    function () {

        calendarViewDate.setMonth(
            calendarViewDate.getMonth() +
            1
        );


        renderCalendar();
    }
);



// ==================================================
// גיבוי
// ==================================================

exportDataButton.addEventListener(
    "click",
    exportData
);



importDataButton.addEventListener(
    "click",
    function () {

        importDataInput.click();
    }
);



importDataInput.addEventListener(
    "change",
    function () {

        const file =
            importDataInput.files
                ?
                importDataInput.files[
                    0
                ]
                :
                null;


        if (
            file
        ) {

            importData(
                file
            );
        }


        importDataInput.value =
            "";
    }
);



// ==================================================
// איפוס
// ==================================================

resetDataButton.addEventListener(
    "click",
    function () {

        if (
            !confirm(
                "למחוק את כל נתוני המעקב?"
            )
        ) {

            return;
        }


        if (
            !confirm(
                "הפעולה אינה ניתנת לביטול. למחוק בכל זאת?"
            )
        ) {

            return;
        }


        localStorage.removeItem(
            STORAGE_KEY
        );


        refreshApp();


        openTab(
            "today"
        );
    }
);



// ==================================================
// רענון האפליקציה
// ==================================================

function refreshApp() {

    recalculateTimingStatuses();


    calculateBleedingDurations();


    renderCycleVisual();


    renderInsights();


    renderMedicalWarnings();


    renderCalendar();


    renderHistory();


    updateRingSheetButtons();


    updateBleedingSheetButtons();
}

// ==================================================
// PWA
// ==================================================

function registerServiceWorker() {

    if (
        !(
            "serviceWorker"
            in
            navigator
        )
    ) {

        return;
    }


    window.addEventListener(
        "load",
        async function () {

            try {

                await navigator
                    .serviceWorker
                    .register(
                        "./service-worker.js"
                    );


                console.log(
                    "Service Worker registered successfully."
                );

            } catch (
                error
            ) {

                console.error(
                    "Service Worker registration failed:",
                    error
                );
            }
        }
    );
}

// ==================================================
// התחלה
// ==================================================

registerServiceWorker();

refreshApp();