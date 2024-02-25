// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

/**
 * @dev Represents the schedule for a meeting.
 */
struct Schedule {
    /**
     * Array of the schedule for each day starting from Monday.
     */
    DayAvailability[7] availability;
    /**
     * Time zone fot the schedule
     */
    string timeZone;
    /**
     * Maximum duration for the meeting in seconds.
     */
    uint256 maxDuration;
}

/**
 * @dev Represents the availability of a day for meetings.
 */
struct DayAvailability {
    /**
     * Boolean value indicating whether the day is available for meetings.
     */
    bool available;
    /**
     * Start hours from which the day is available for meetings.
     *
     * Format  HH:MM
     */
    string startHours;
    /**
     * End hours beyond which meetings can't be scheduled
     */
    string endHours;
}

interface IMeetings {
    function getSchedule(address) external view returns (Schedule memory);
}
