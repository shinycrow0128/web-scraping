"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Mail, Calendar, Hash, User } from "lucide-react"

interface BusinessEntity {
  business_id: string
  entity_name: string
  business_address: string
  mailing_address: string
  date_formed: string
  naics_code: string
  business_email: string
  principal_name: string
}

interface BusinessTableProps {
  data: BusinessEntity[]
}

export function BusinessTable({ data }: BusinessTableProps) {
  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Business entities matching your search criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Entity Name</TableHead>
                    <TableHead>Business Address</TableHead>
                    <TableHead>Mailing Address</TableHead>
                    <TableHead className="w-[120px]">Date Formed</TableHead>
                    <TableHead className="w-[100px]">NAICS Code</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Principal Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((business) => (
                    <TableRow key={business.business_id}>
                      <TableCell className="font-medium">{business.entity_name}</TableCell>
                      <TableCell className="text-sm">{business.business_address}</TableCell>
                      <TableCell className="text-sm">{business.mailing_address}</TableCell>
                      <TableCell className="text-sm">{business.date_formed}</TableCell>
                      <TableCell>
                        {business.naics_code !== "N/A" ? (
                          <Badge variant="secondary">{business.naics_code}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{business.business_email}</TableCell>
                      <TableCell className="text-sm">{business.principal_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {data.map((business) => (
          <Card key={business.business_id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-start gap-2">
                <Building2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-balance">{business.entity_name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-1">Business Address</p>
                  <p>{business.business_address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-1">Mailing Address</p>
                  <p>{business.mailing_address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-1">Date Formed</p>
                  <p>{business.date_formed}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Hash className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-1">NAICS Code</p>
                  {business.naics_code !== "N/A" ? (
                    <Badge variant="secondary">{business.naics_code}</Badge>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-1">Business Email</p>
                  <p className="break-all">{business.business_email}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <User className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-1">Principal Name</p>
                  <p>{business.principal_name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
