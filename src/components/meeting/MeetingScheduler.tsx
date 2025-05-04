import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTheme } from '@/contexts/ThemeContext';

interface MeetingSchedulerProps {
  email: string;
}

type Platform = 'google' | 'teams' | 'zoom';

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ email }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState('30');
  const [platform, setPlatform] = useState<Platform>('google');
  const locale = i18n.language === 'fr' ? fr : enUS;

  const isDarkTheme = theme !== 'light';
  const baseInputClass = `border rounded-md p-2 ${
    isDarkTheme 
      ? 'bg-terminal-dark border-gray-700 text-gray-300' 
      : 'bg-white border-blue-200 text-blue-900'
  }`;

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return slots;
  };

  const handleScheduleMeeting = () => {
    if (!date) return;

    const [hours, minutes] = time.split(':').map(Number);
    const meetingDate = new Date(date);
    meetingDate.setHours(hours, minutes, 0);
    
    const endDate = new Date(meetingDate);
    endDate.setMinutes(meetingDate.getMinutes() + parseInt(duration));

    const startTime = meetingDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    let url = '';
    const meetingDetails = {
      text: t('contact.meeting.description'),
      dates: `${startTime}/${endTime}`,
      details: `${t('contact.meeting.platforms.' + platform)} link will be provided in the calendar invitation.`,
      location: `${t('contact.meeting.platforms.' + platform)} (link will be provided)`,
    };

    switch (platform) {
      case 'google':
        url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meetingDetails.text)}&dates=${meetingDetails.dates}&details=${encodeURIComponent(meetingDetails.details)}&location=${encodeURIComponent(meetingDetails.location)}&add=google&add=${encodeURIComponent(email)}`;
        break;
      case 'teams':
        url = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(meetingDetails.text)}&startdt=${meetingDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(meetingDetails.details)}&location=${encodeURIComponent(meetingDetails.location)}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
        break;
      case 'zoom':
        // Rediriger vers la page de planification Zoom
        url = `https://zoom.us/meeting/schedule?email=${encodeURIComponent(email)}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`border p-3 rounded-md hover:bg-current/5 transition-colors cursor-pointer ${
          isDarkTheme ? 'border-current' : 'border-blue-200'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Video size={18} />
              <span>{t('contact.meeting.title')}</span>
            </div>
            <span className="underline">
              {t('contact.meeting.button')}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={`${
        isDarkTheme 
          ? 'bg-terminal-dark border-gray-700 text-gray-300' 
          : 'bg-white border-blue-200 text-blue-900'
      }`}>
        <DialogHeader>
          <DialogTitle className={isDarkTheme ? 'text-gray-300' : 'text-blue-900'}>
            {t('contact.meeting.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm">{t('contact.meeting.platform')}</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className={baseInputClass}
            >
              <option value="google">{t('contact.meeting.platforms.google')}</option>
              <option value="teams">{t('contact.meeting.platforms.teams')}</option>
              <option value="zoom">{t('contact.meeting.platforms.zoom')}</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm">{t('contact.meeting.selectDate')}</label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={locale}
                className={`border rounded-md ${
                  isDarkTheme 
                    ? 'border-gray-700 bg-terminal-dark' 
                    : 'border-blue-200 bg-white'
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm">{t('contact.meeting.selectTime')}</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={baseInputClass}
            >
              {generateTimeSlots().map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm">{t('contact.meeting.duration')}</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={baseInputClass}
            >
              <option value="30">30 {t('contact.meeting.minutes')}</option>
              <option value="60">60 {t('contact.meeting.minutes')}</option>
            </select>
          </div>
          <button
            onClick={handleScheduleMeeting}
            disabled={!date}
            className={`w-full border rounded-md p-2 transition-colors disabled:opacity-50 ${
              isDarkTheme 
                ? 'border-gray-700 hover:bg-gray-800 text-gray-300' 
                : 'border-blue-200 hover:bg-blue-50 text-blue-900'
            }`}
          >
            {t('contact.meeting.schedule')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingScheduler; 