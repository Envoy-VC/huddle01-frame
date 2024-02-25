// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interfaces/IMeetings.sol";

contract Meetings is IMeetings {
    mapping(address => Schedule) public schedules;

    function getSchedule(address user) external view returns (Schedule memory) {
        return schedules[user];
    }

    function setSchedule(address user, Schedule memory schedule) external {
        schedules[user] = schedule;
    }

    function updateDayAvailability(address user, uint256 day, DayAvailability memory availability) external {
        schedules[user].availability[day] = availability;
    }

    function updateTimeZone(address user, string memory timeZone) external {
        schedules[user].timeZone = timeZone;
    }

    function updateMaxDuration(address user, uint256 maxDuration) external {
        schedules[user].maxDuration = maxDuration;
    }

    function updateMultipleDayAvailability(
        address user,
        uint256[] calldata _days,
        DayAvailability[] memory availabilities
    ) external {
        for (uint256 i = 0; i < _days.length; i++) {
            schedules[user].availability[_days[i]] = availabilities[i];
        }
    }
}
