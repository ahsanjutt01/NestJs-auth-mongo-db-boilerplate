/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly httpService: HttpService) {}
  @Cron('5 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 5');
    this.findAll().subscribe((x) => {
      // this.logger.debug('find all => ', x);
      console.log('=========================================================');
      console.log(
        '=====================START====================================',
      );
      console.log(x.data.data);
      console.log(
        '=====================END====================================',
      );
      console.log('=========================================================');
    });
  }

  findAll(): Observable<AxiosResponse<any>> {
    const token = '1Ulm6R7mesm6VKeg24OKTLCRYCSO3QGYM816d3g6';
    // const encodeToken = Buffer.from(APIKEY, 'base64').toString();

    const encodeToken = Buffer.from(token).toString('base64');
    console.log('encodeToken => ', encodeToken);
    const headers = {
      'Content-Type': 'application/json', // afaik this one is not needed
      Authorization: `Basic ${encodeToken}`,
    };
    // return this.httpService.get('http://localhost:5000');
    return this.httpService.post(
      'https://api.printful.com/mockup-generator/create-task/71',
      this.getPrintFullObject(),
      { headers },
    );
  }

  getPrintFullObject() {
    const obj = {
      variant_ids: [4012, 4013, 4014, 4017, 4018, 4019],
      format: 'jpg',
      width: 60,
      // product_options: {},
      // option_groups: {},
      // options: [],
      files: [
        {
          placement: 'front',
          image_url:
            'https://vape.allomate.solutions//storage/homepage/NastyWebBanner-2155312001626183387.jpg',
          position: {
            area_width: 1800,
            area_height: 2400,
            width: 1800,
            height: 1800,
            top: 300,
            left: 0,
          },
        },
      ],
    };
    return obj;
  }
}
