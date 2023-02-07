import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import useWidgetAPI from "utils/proxy/use-widget-api";
import Block from "components/services/widget/block";
import { useEffect, useState } from "react";

function formatTime(time) {
  const abs = time >= 0;
  if (!abs) time = Math.abs(time);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return {
    abs,
    diff: {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    },
  };
}

export default function Component({ service }) {
  const { widget } = service;

  const [time, setTime] = useState();
  const { data, error } = useWidgetAPI(widget, "upcoming");

  const launch = data?.data?.launches[0];
  const net = launch?.net;

  useEffect(() => {
    const formatter = setInterval(() => {
      setTime(formatTime(new Date(net).getTime() - Date.now()));
    }, 1000);

    return () => {
      clearInterval(formatter);
    };
  }, [net, data]);

  if (error) return <Container error={error} />;

  if (!data || !time || !time.diff)
    return (
      <Container>
        <Block label="spaceflight.mission" />
        <Block label="spaceflight.net" />
        <Block label="spaceflight.status" />
      </Container>
    );

  return (
    <Container service={service}>
      <Block label="spaceflight.mission" value={launch.name} />
      <Block
        label="spaceflight.net"
        value={
          time
            ? `T${time.abs ? "-" : "+"} ${time.diff.days}d ${time.diff.hours}h ${time.diff.minutes}m ${
                time.diff.seconds
              }s`
            : "TBA"
        }
      />
      <Block label="spaceflight.status" value={launch.status} />
    </Container>
  );
}
