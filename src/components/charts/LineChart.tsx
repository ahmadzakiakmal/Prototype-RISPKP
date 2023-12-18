import { ResponsiveLine } from "@nivo/line";

export default function LineChart() {
  const data = [
    {
      "id": "Kota Yogyakarta",
      "color": "hsl(176, 70%, 50%)",
      "data": [
        {
          "x": "spbu",
          "y": 84
        },
        {
          "x": "pertamini",
          "y": 76
        },
        {
          "x": "industri",
          "y": 35
        },
        {
          "x": "perbelanjaan",
          "y": 85
        },
        {
          "x": "sekolah",
          "y": 40
        },
        {
          "x": "rumah sakit",
          "y": 232
        },
        {
          "x": "toko bahan kimia",
          "y": 133
        },
        {
          "x": "toko petasan",
          "y": 212
        },
        {
          "x": "instansi militer",
          "y": 18
        },
        {
          "x": "kepadatan penduduk",
          "y": 274
        },
        {
          "x": "kepadatan bangunan",
          "y": 57
        },
        {
          "x": "lainnya",
          "y": 62
        }
      ]
    },
    {
      "id": "Sleman",
      "color": "hsl(248, 70%, 50%)",
      "data": [
        {
          "x": "spbu",
          "y": 141
        },
        {
          "x": "pertamini",
          "y": 220
        },
        {
          "x": "industri",
          "y": 70
        },
        {
          "x": "perbelanjaan",
          "y": 179
        },
        {
          "x": "sekolah",
          "y": 175
        },
        {
          "x": "rumah sakit",
          "y": 61
        },
        {
          "x": "toko bahan kimia",
          "y": 245
        },
        {
          "x": "toko petasan",
          "y": 293
        },
        {
          "x": "instansi militer",
          "y": 20
        },
        {
          "x": "kepadatan penduduk",
          "y": 78
        },
        {
          "x": "kepadatan bangunan",
          "y": 19
        },
        {
          "x": "lainnya",
          "y": 192
        }
      ]
    },
    {
      "id": "Bantul",
      "color": "hsl(191, 70%, 50%)",
      "data": [
        {
          "x": "spbu",
          "y": 22
        },
        {
          "x": "pertamini",
          "y": 161
        },
        {
          "x": "industri",
          "y": 71
        },
        {
          "x": "perbelanjaan",
          "y": 37
        },
        {
          "x": "sekolah",
          "y": 158
        },
        {
          "x": "rumah sakit",
          "y": 78
        },
        {
          "x": "toko bahan kimia",
          "y": 267
        },
        {
          "x": "toko petasan",
          "y": 146
        },
        {
          "x": "instansi militer",
          "y": 186
        },
        {
          "x": "kepadatan penduduk",
          "y": 63
        },
        {
          "x": "kepadatan bangunan",
          "y": 261
        },
        {
          "x": "lainnya",
          "y": 21
        }
      ]
    },
    {
      "id": "Kulon Progo",
      "color": "hsl(30, 70%, 50%)",
      "data": [
        {
          "x": "spbu",
          "y": 48
        },
        {
          "x": "pertamini",
          "y": 122
        },
        {
          "x": "industri",
          "y": 158
        },
        {
          "x": "perbelanjaan",
          "y": 3
        },
        {
          "x": "sekolah",
          "y": 266
        },
        {
          "x": "rumah sakit",
          "y": 84
        },
        {
          "x": "toko bahan kimia",
          "y": 69
        },
        {
          "x": "toko petasan",
          "y": 40
        },
        {
          "x": "instansi militer",
          "y": 79
        },
        {
          "x": "kepadatan penduduk",
          "y": 100
        },
        {
          "x": "kepadatan bangunan",
          "y": 51
        },
        {
          "x": "lainnya",
          "y": 287
        }
      ]
    },
    {
      "id": "Gunung Kidul",
      "color": "hsl(53, 70%, 50%)",
      "data": [
        {
          "x": "spbu",
          "y": 198
        },
        {
          "x": "pertamini",
          "y": 168
        },
        {
          "x": "industri",
          "y": 232
        },
        {
          "x": "perbelanjaan",
          "y": 218
        },
        {
          "x": "sekolah",
          "y": 262
        },
        {
          "x": "rumah sakit",
          "y": 174
        },
        {
          "x": "toko bahan kimia",
          "y": 15
        },
        {
          "x": "toko petasan",
          "y": 169
        },
        {
          "x": "instansi militer",
          "y": 259
        },
        {
          "x": "kepadatan penduduk",
          "y": 129
        },
        {
          "x": "kepadatan bangunan",
          "y": 234
        },
        {
          "x": "lainnya",
          "y": 170
        }
      ]
    }
  ];
  return (
    <div className="min-h-[600px] w-full">
      {/* // eslint-disable 
      @ts-ignore*/}
      <ResponsiveLine
        width={1500}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Faktor Risiko",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Nilai",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
