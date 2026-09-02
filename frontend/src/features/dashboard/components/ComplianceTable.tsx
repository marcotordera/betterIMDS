import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import StatusBadge from './StatusBadge';
import { COURSES } from '../data/mockData';
import { AirmanMatrixRow } from '../../../types/utm';

interface Props {
  roster: AirmanMatrixRow[];
  selectedSquadron: string;
  onCellClick: (airmanId: number, courseCode: string) => void;
}

export default function ComplianceTable({ roster, selectedSquadron, onCellClick }: Props) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
      <Table sx={{ minWidth: 800 }}>
        {/* Table Header */}
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Rank</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Airman Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>EDIPI</TableCell>
            {COURSES.map((course) => (
              <TableCell key={course.courseCode} align="center" sx={{ fontWeight: 700 }}>
                {course.courseTitle}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Rows */}
        <TableBody>
          {roster.map((row) => (
            <TableRow key={row.airman.uid} hover>
              <TableCell sx={{ fontWeight: 600 }}>{row.airman.rank}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                {row.airman.lastName}, {row.airman.firstName}
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                {row.airman.edipi}
              </TableCell>

              {/* Course Status Pills */}
              {COURSES.map((course) => {
                const detail = row.courses[course.courseCode];
                return (
                  <TableCell key={course.courseCode} align="center">
                    <StatusBadge
                      detail={detail}
                      onClick={() => onCellClick(row.airman.uid, course.courseCode)}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {/* Empty State */}
          {roster.length === 0 && (
            <TableRow>
              <TableCell colSpan={3 + COURSES.length} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                No Airmen found in {selectedSquadron} matching the criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
